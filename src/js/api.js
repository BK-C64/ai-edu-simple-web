import { cars } from './data/cars.js';

/**
 * Zwraca listę samochodów. W przyszłości może być to pobieranie z serwera.
 * @returns {Promise<Array>} Obietnica zwracająca tablicę samochodów.
 */
export const getCars = async () => {
  // Symulacja opóźnienia sieciowego
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cars);
    }, 300);
  });
};
