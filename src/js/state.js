/**
 * Centralny stan aplikacji (Single Source of Truth).
 * Przechowuje aktualnie wyświetlane dane i parametry filtrów.
 */
export const state = {
  cars: [],           // Wszystkie dostępne samochody
  filteredCars: [],   // Samochody po zastosowaniu filtrów/wyszukiwania
  isLoading: true,    // Czy trwa ładowanie danych
  error: null         // Ewentualny błąd ładowania
};

/**
 * Aktualizuje listę samochodów w stanie.
 * @param {Array} cars 
 */
export const setCars = (cars) => {
  state.cars = cars;
  state.filteredCars = [...cars];
  state.isLoading = false;
};

/**
 * Ustawia błąd w stanie.
 * @param {string} error 
 */
export const setError = (error) => {
  state.error = error;
  state.isLoading = false;
};
