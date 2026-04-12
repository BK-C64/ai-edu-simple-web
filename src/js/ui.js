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
  
  // Renderujemy licznik (szukamy kontenera licznika)
  const countContainer = document.getElementById('results-count');
  if (countContainer) {
    renderResultsCount(cars.length, countContainer);
  }
  
  if (cars.length === 0) {
    container.innerHTML = '<p class="no-results">Brak ofert pasujących do wybranych kryteriów.</p>';
    return;
  }
  
  container.innerHTML = cars.map(car => createCarCard(car)).join('');
};

/**
 * Renderuje aktualną liczbę wyników.
 * @param {number} count 
 * @param {HTMLElement} container 
 */
export const renderResultsCount = (count, container) => {
  if (!container) return;
  container.innerText = `Znaleziono: ${count} ${count === 1 ? 'ofertę' : count > 1 && count < 5 ? 'oferty' : 'ofert'}`;
};

/**
 * Funkcja formatująca przebieg (km).
 * @param {number} mileage 
 * @returns {string}
 */
const formatMileage = (mileage) => {
  return new Intl.NumberFormat('pl-PL').format(mileage) + ' km';
};

/**
 * Renderuje szczegóły samochodu w modalu.
 * @param {Object} car 
 */
export const renderModal = (car) => {
  const modal = document.getElementById('car-modal');
  const modalBody = document.getElementById('modal-body');
  
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-body-content">
      <div class="modal-image-side">
        <img src="${car.obrazek}" alt="${car.marka} ${car.model}">
      </div>
      <div class="modal-info-side">
        <h2 class="brand">${car.marka}</h2>
        <h3 class="model">${car.model}</h3>
        <p class="modal-price">${formatPrice(car.cena)}</p>
        
        <div class="modal-specs">
          <div class="spec-item">
            <span class="spec-label">Rok produkcji</span>
            <span class="spec-value">${car.rok}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Paliwo</span>
            <span class="spec-value">${car.paliwo}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Przebieg</span>
            <span class="spec-value">${formatMileage(car.przebieg)}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Stan</span>
            <span class="spec-value">${car.stan}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  // Dodajemy klasę active po krótkim opóźnieniu dla animacji
  setTimeout(() => modal.classList.add('active'), 10);
  document.body.style.overflow = 'hidden'; // Blokada scrolla
};

/**
 * Zamyka modal.
 */
export const closeModal = () => {
  const modal = document.getElementById('car-modal');
  if (!modal) return;

  modal.classList.remove('active');
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Przywrócenie scrolla
  }, 300);
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
