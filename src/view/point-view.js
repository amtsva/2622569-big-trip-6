import AbstractView from './abstract-view.js';

export default class PointView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  getTemplate() {
    const startDate = this.#point.startDate;
    const endDate = this.#point.endDate;

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const day = startDate.getDate().toString().padStart(2, '0');
    const month = months[startDate.getMonth()];
    const formattedDate = `${month} ${day}`;

    const startTime = `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;
    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

    const offersHtml = this.#point.offers.map((offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
    `).join('');

    const favoriteClass = this.#point.isFavorite ? 'event__favorite-btn--active' : '';

    return `
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="${startDate.toISOString().split('T')[0]}">${formattedDate}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${this.#point.type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${this.#point.type} to ${this.#point.destination.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${startDate.toISOString()}">${startTime}</time>
              &mdash;
              <time class="event__end-time" datetime="${endDate.toISOString()}">${endTime}</time>
            </p>
          </div>
          <p class="event__price">
            &euro; ${this.#point.price}
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offersHtml}
          </ul>
          <button class="event__favorite-btn ${favoriteClass}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.228 4.326 1.572-9.163L.587 9.674l9.196-1.336L14 .587l4.217 7.751 9.196 1.336-6.757 6.489 1.572 9.163z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
            &plus;
          </button>
        </div>
      </li>
    `;
  }
}
