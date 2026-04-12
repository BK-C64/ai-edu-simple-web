/**
 * Centralny stan aplikacji (Single Source of Truth).
 * Przechowuje aktualnie wyświetlane dane i parametry filtrów.
 */
export const state = {
  cars: [],           // Wszystkie dostępne samochody
  filteredCars: [],   // Samochody po zastosowaniu filtrów/wyszukiwania
  searchTerm: '',     // Fraza wyszukiwania
  isLoading: true,    // Czy trwa ładowanie danych
  error: null         // Ewentualny błąd ładowania
};

/**
 * Aktualizuje listę samochodów w stanie.
 * @param {Array} cars 
 */
export const setCars = (cars) => {
  state.cars = cars;
  applyFilters();
  state.isLoading = false;
};

/**
 * Ustawia frazę wyszukiwania i aplikuje filtry.
 * @param {string} term 
 */
export const setSearchTerm = (term) => {
  state.searchTerm = term.toLowerCase();
  applyFilters();
};

/**
 * Filtruje samochody na podstawie aktualnego stanu.
 */
const applyFilters = () => {
  if (!state.searchTerm) {
    state.filteredCars = [...state.cars];
    return;
  }

  state.filteredCars = state.cars.filter(car => 
    car.marka.toLowerCase().includes(state.searchTerm) || 
    car.model.toLowerCase().includes(state.searchTerm)
  );
};

/**
 * Ustawia błąd w stanie.
 * @param {string} error 
 */
export const setError = (error) => {
  state.error = error;
  state.isLoading = false;
};
