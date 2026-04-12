/**
 * Funkcja formatująca cenę do polskiego standardu (PLN).
 * @param {number} price 
 * @returns {string}
 */
const formatPrice = (price) => {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(price);
};

/**
 * Tworzy element HTML karty samochodu.
 * @param {Object} car 
 * @returns {string}
 */
const createCarCard = (car) => {
  return `
    <div class="car-card" data-id="${car.id}">
      <div class="card-header">
        <div class="car-avatar">${car.marka[0]}</div>
        <div class="car-title">
          <span class="brand">${car.marka}</span>
          <span class="model">${car.model}</span>
        </div>
      </div>
      <div class="card-image-wrapper">
        <img src="${car.obrazek}" alt="${car.marka} ${car.model}" class="card-image" loading="lazy">
      </div>
      <div class="card-content">
        <div class="card-actions">
           <span class="price-tag">${formatPrice(car.cena)}</span>
        </div>
        <div class="card-details">
          <span><strong>${car.rok}</strong> • ${car.paliwo}</span>
        </div>
      </div>
    </div>
  `;
};

/**
 * Renderuje listę samochodów do wskazanego kontenera.
 * @param {Array} cars 
 * @param {HTMLElement} container 
 */
export const renderCarList = (cars, container) => {
  if (!container) return;
  
  // Czyścimy kontener przed nowym renderowaniem
  container.innerHTML = '';
  
  if (cars.length === 0) {
    container.innerHTML = '<p class="no-results">Brak ofert pasujących do wybranych kryteriów.</p>';
    return;
  }
  
  container.innerHTML = cars.map(car => createCarCard(car)).join('');
};

/**
 * Renderuje komunikat o ładowaniu.
 * @param {HTMLElement} container 
 */
export const renderLoading = (container) => {
  if (!container) return;
  container.innerHTML = '<p class="info-message">Ładowanie ofert...</p>';
};

/**
 * Renderuje błąd.
 * @param {string} message 
 * @param {HTMLElement} container 
 */
export const renderError = (message, container) => {
  if (!container) return;
  container.innerHTML = `<p class="error-message">Wystąpił błąd: ${message}</p>`;
};
