import { getCars } from './api.js';
import { renderCarList, renderLoading, renderError, renderModal, closeModal } from './ui.js';
import { state, setCars, setError, setSearchTerm } from './state.js';

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

  // 1. Wyszukiwanie (z Debouncingiem)
  if (searchInput) {
    const handleSearch = debounce((e) => {
      setSearchTerm(e.target.value);
      renderCarList(state.filteredCars, container);
    }, 300);

    searchInput.addEventListener('input', handleSearch);
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

  // 3. Zamykanie modala (Przycisk X)
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // 4. Zamykanie modala (Kliknięcie w tło)
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // 5. Zamykanie modala (Klawisz ESC)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
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
