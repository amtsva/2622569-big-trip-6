import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import AbstractView from '../framework/view/abstract-view.js';

dayjs.extend(duration);

function formatEventDate(date) {
  return dayjs(date).format('MMM DD');
}

function formatEventTime(date) {
  return dayjs(date).format('HH:mm');
}

function getDuration(startDate, endDate) {
  const diff = dayjs(endDate).diff(dayjs(startDate));

  const durationTime = dayjs.duration(diff);

  const days = durationTime.days();
  const hours = durationTime.hours();
  const minutes = durationTime.minutes();

  if (days > 0) {
    return `${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }

  return `${String(minutes).padStart(2, '0')}M`;
}

function createOffersTemplate(offers) {
  return offers.map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `).join('');
}

function createPointTemplate(point) {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    offers,
    type
  } = point;

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">
          ${formatEventDate(dateFrom)}
        </time>

        <div class="event__type">
          <img
            class="event__type-icon"
            width="42"
            height="42"
            src="img/icons/${type}.png"
            alt="Event type icon"
          >
        </div>

        <h3 class="event__title">
          ${type} ${destination.name}
        </h3>

        <div class="event__schedule">
          <p class="event__time">
            <time
              class="event__start-time"
              datetime="${dateFrom}"
            >
              ${formatEventTime(dateFrom)}
            </time>
            —
            <time
              class="event__end-time"
              datetime="${dateTo}"
            >
              ${formatEventTime(dateTo)}
            </time>
          </p>

          <p class="event__duration">
            ${getDuration(dateFrom, dateTo)}
          </p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>

        <ul class="event__selected-offers">
          ${createOffersTemplate(offers)}
        </ul>

        <button
          class="event__favorite-btn ${favoriteClassName}"
          type="button"
        >
          <span class="visually-hidden">
            Add to favorite
          </span>

          <svg
            class="event__favorite-icon"
            width="28"
            height="28"
            viewBox="0 0 28 28"
          >
            <path d="M14 21l-8.328 4.373 1.591-9.276L.525 9.727l9.314-1.353L14 .933l4.161 7.441 9.314 1.353-6.738 6.37 1.591 9.276z"/>
          </svg>
        </button>

        <button
          class="event__rollup-btn"
          type="button"
        >
          <span class="visually-hidden">
            Open event
          </span>
        </button>
      </div>
    </li>
  `;
}

export default class PointView extends AbstractView {
  #point = null;

  #handleEditClick = null;

  #handleFavoriteClick = null;

  constructor({ point, onEditClick, onFavoriteClick }) {
    super();

    this.#point = point;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
