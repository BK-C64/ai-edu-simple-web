import { getCars } from './api.js';
import { renderCarList, renderLoading, renderError } from './ui.js';
import { state, setCars, setError } from './state.js';

/**
 * Główna funkcja inicjalizująca aplikację.
 */
const init = async () => {
  const container = document.getElementById('car-list');
  
  if (!container) {
    console.error('Nie znaleziono kontenera dla listy samochodów.');
    return;
  }
  
  try {
    // 1. Wyświetlenie stanu ładowania
    renderLoading(container);
    
    // 2. Pobranie danych i aktualizacja stanu
    const cars = await getCars();
    setCars(cars);
    
    // 3. Renderowanie UI na podstawie stanu
    renderCarList(state.filteredCars, container);
    
  } catch (error) {
    console.error('Błąd podczas inicjalizacji aplikacji:', error);
    setError(error.message);
    renderError(state.error, container);
  }
};

// Start aplikacji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', init);
