import { getCars } from './api.js';
import { renderCarList, renderLoading, renderError, renderModal, closeModal, renderAddCarForm, showNotification } from './ui.js';
import { state, setCars, setError, setSearchTerm, setFilter, resetFilters, addCar } from './state.js';

/**
 * Funkcja pomocnicza do debouncingu.
 */
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Konfiguruje obsługę zdarzeń w aplikacji.
 */
const setupEventListeners = (container) => {
  const searchInput = document.getElementById('search-input');
  const modal = document.getElementById('car-modal');
  const modalClose = document.getElementById('modal-close');
  
  // Dodawanie ogłoszenia
  const btnOpenAddCar = document.getElementById('btn-open-add-car');
  const addModal = document.getElementById('add-car-modal');
  const addModalClose = document.getElementById('add-modal-close');
  const addModalBody = document.getElementById('add-modal-body');

  // Filtry
  const priceMin = document.getElementById('filter-price-min');
  const priceMax = document.getElementById('filter-price-max');
  const yearMin = document.getElementById('filter-year-min');
  const yearMax = document.getElementById('filter-year-max');
  const fuelType = document.getElementById('filter-fuel');
  const btnReset = document.getElementById('btn-reset-filters');

  // 1. Wyszukiwanie (z Debouncingiem)
  if (searchInput) {
    const handleSearch = debounce((e) => {
      setSearchTerm(e.target.value);
      renderCarList(state.filteredCars, container);
    }, 300);

    searchInput.addEventListener('input', handleSearch);
  }

  // 1.2 Filtry (z Debouncingiem dla pól tekstowych)
  const handleFilterChange = debounce((key, value) => {
    setFilter(key, value);
    renderCarList(state.filteredCars, container);
  }, 300);

  if (priceMin) priceMin.addEventListener('input', (e) => handleFilterChange('priceMin', e.target.value));
  if (priceMax) priceMax.addEventListener('input', (e) => handleFilterChange('priceMax', e.target.value));
  if (yearMin) yearMin.addEventListener('input', (e) => handleFilterChange('yearMin', e.target.value));
  if (yearMax) yearMax.addEventListener('input', (e) => handleFilterChange('yearMax', e.target.value));
  
  if (fuelType) {
    fuelType.addEventListener('change', (e) => {
      setFilter('fuelType', e.target.value);
      renderCarList(state.filteredCars, container);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      resetFilters();
      
      // Generyczne czyszczenie wszystkich pól wejściowych w filtrach i wyszukiwarce
      const inputs = document.querySelectorAll('.filter-input, .filter-select, .search-input');
      inputs.forEach(input => {
        input.value = '';
      });
      
      renderCarList(state.filteredCars, container);
    });
  }

  // 2. Kliknięcie w kartę (Delegacja zdarzeń)
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.car-card');
    if (card) {
      const carId = parseInt(card.dataset.id);
      const car = state.cars.find(c => c.id === carId);
      if (car) renderModal(car);
    }
  });

  // 3. Dodawanie ogłoszenia - otwarcie modala
  if (btnOpenAddCar && addModal && addModalBody) {
    btnOpenAddCar.addEventListener('click', () => {
      renderAddCarForm(addModalBody);
      addModal.classList.remove('hidden');
      setTimeout(() => addModal.classList.add('active'), 10);
      document.body.style.overflow = 'hidden';
    });
  }

  // 3.1 Obsługa submit formularza (Delegacja zdarzeń na addModalBody)
  if (addModalBody) {
    addModalBody.addEventListener('submit', (e) => {
      if (e.target.id === 'add-car-form') {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const newCar = {
          marka: formData.get('marka'),
          model: formData.get('model'),
          cena: formData.get('cena'),
          rok: formData.get('rok'),
          przebieg: formData.get('przebieg'),
          paliwo: formData.get('paliwo'),
          stan: formData.get('stan'),
          obrazek: formData.get('obrazek') || 'https://via.placeholder.com/600x400?text=Brak+zdjęcia'
        };

        // Walidacja dodatkowa
        if (newCar.cena <= 0 || newCar.rok <= 0) {
          showNotification('Cena i rok muszą być większe od 0', 'error');
          return;
        }

        addCar(newCar);
        closeModal('add-car-modal');
        renderCarList(state.filteredCars, container);
        showNotification('Ogłoszenie zostało dodane pomyślnie!', 'success');
      }
    });
  }

  // 4. Zamykanie modali (Przyciski X)
  if (modalClose) {
    modalClose.addEventListener('click', () => closeModal('car-modal'));
  }
  if (addModalClose) {
    addModalClose.addEventListener('click', () => closeModal('add-car-modal'));
  }

  // 5. Zamykanie modali (Kliknięcie w tło)
  [modal, addModal].forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m) closeModal(m.id);
      });
    }
  });

  // 6. Zamykanie modala (Klawisz ESC)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
};

/**
 * Główna funkcja inicjalizująca aplikację.
 */
const init = async () => {
  const container = document.getElementById('car-list');
  
  if (!container) {
    console.error('Nie znaleziono kontenera dla listy samochodów.');
    return;
  }
  
  setupEventListeners(container);
  
  try {
    renderLoading(container);
    const cars = await getCars();
    setCars(cars);
    renderCarList(state.filteredCars, container);
    
  } catch (error) {
    console.error('Błąd podczas inicjalizacji aplikacji:', error);
    setError(error.message);
    renderError(state.error, container);
  }
};

// Start aplikacji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', init);
