/**
 * Centralny stan aplikacji (Single Source of Truth).
 * Przechowuje aktualnie wyświetlane dane i parametry filtrów.
 */
export const state = {
  cars: [],           // Wszystkie dostępne samochody
  filteredCars: [],   // Samochody po zastosowaniu filtrów/wyszukiwania
  searchTerm: '',     // Fraza wyszukiwania
  filters: {
    priceMin: null,
    priceMax: null,
    yearMin: null,
    yearMax: null,
    fuelType: ''
  },
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
 * Aktualizuje konkretny parametr filtra.
 * @param {string} key 
 * @param {any} value 
 */
export const setFilter = (key, value) => {
  if (key === 'fuelType') {
    state.filters[key] = value;
  } else {
    // Sprawdzamy czy wartość nie jest pustym ciągiem, aby poprawnie obsługiwać 0
    state.filters[key] = (value !== '' && value !== null) ? Number(value) : null;
  }
  applyFilters();
};

/**
 * Resetuje wszystkie filtry do wartości domyślnych.
 */
export const resetFilters = () => {
  state.searchTerm = '';
  state.filters = {
    priceMin: null,
    priceMax: null,
    yearMin: null,
    yearMax: null,
    fuelType: ''
  };
  applyFilters();
};

/**
 * Filtruje samochody na podstawie aktualnego stanu.
 */
const applyFilters = () => {
  state.filteredCars = state.cars.filter(car => {
    // 1. Wyszukiwanie tekstowe
    const matchesSearch = !state.searchTerm || 
      car.marka.toLowerCase().includes(state.searchTerm) || 
      car.model.toLowerCase().includes(state.searchTerm);

    // 2. Filtrowanie po cenie
    const matchesPriceMin = state.filters.priceMin === null || car.cena >= state.filters.priceMin;
    const matchesPriceMax = state.filters.priceMax === null || car.cena <= state.filters.priceMax;

    // 3. Filtrowanie po roku
    const matchesYearMin = state.filters.yearMin === null || car.rok >= state.filters.yearMin;
    const matchesYearMax = state.filters.yearMax === null || car.rok <= state.filters.yearMax;

    // 4. Filtrowanie po paliwie
    const matchesFuel = !state.filters.fuelType || car.paliwo === state.filters.fuelType;

    return matchesSearch && matchesPriceMin && matchesPriceMax && matchesYearMin && matchesYearMax && matchesFuel;
  });
};

/**
 * Ustawia błąd w stanie.
 * @param {string} error 
 */
export const setError = (error) => {
  state.error = error;
  state.isLoading = false;
};
