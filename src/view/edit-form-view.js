import dayjs from 'dayjs';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import {
  TYPES,
  OFFERS,
  CITIES
} from '../const.js';

function humanizePointDate(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

function createOffersTemplate(pointType, selectedOffers = []) {
  const offers = OFFERS[pointType] || [];

  return offers.map((offer) => {
    const isChecked = selectedOffers.includes(offer.title);

    return `
      <div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${offer.title}"
          type="checkbox"
          name="event-offer-${offer.title}"
          ${isChecked ? 'checked' : ''}
        >

        <label
          class="event__offer-label"
          for="event-offer-${offer.title}"
        >
          <span class="event__offer-title">
            ${offer.title}
          </span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">
            ${offer.price}
          </span>
        </label>
      </div>
    `;
  }).join('');
}

function createTypeTemplate(currentType) {
  return TYPES.map((type) => `
    <div class="event__type-item">
      <input
        id="event-type-${type}-1"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${type === currentType ? 'checked' : ''}
      >

      <label
        class="event__type-label event__type-label--${type}"
        for="event-type-${type}-1"
      >
        ${type}
      </label>
    </div>
  `).join('');
}

function createDestinationListTemplate() {
  return CITIES.map((city) => `
    <option value="${city.name}"></option>
  `).join('');
}

function createPhotosTemplate(pictures = []) {
  return pictures.map((picture) => `
    <img
      class="event__photo"
      src="${picture.src}"
      alt="${picture.description}"
    >
  `).join('');
}

function createEditFormTemplate(point) {
  const {
    type,
    destination,
    startDate,
    endDate,
    price,
    offers
  } = point;

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">

        <header class="event__header">

          <div class="event__type-wrapper">
            <label
              class="event__type event__type-btn"
              for="event-type-toggle-1"
            >
              <span class="visually-hidden">
                Choose event type
              </span>

              <img
                class="event__type-icon"
                width="17"
                height="17"
                src="img/icons/${type}.png"
                alt="Event type icon"
              >
            </label>

            <input
              class="event__type-toggle visually-hidden"
              id="event-type-toggle-1"
              type="checkbox"
            >

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">
                  Event type
                </legend>

                ${createTypeTemplate(type)}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group event__field-group--destination">
            <label
              class="event__label event__type-output"
              for="event-destination-1"
            >
              ${type}
            </label>

            <input
              class="event__input event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destination?.name || ''}"
              list="destination-list-1"
            >

            <datalist id="destination-list-1">
              ${createDestinationListTemplate()}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <label
              class="visually-hidden"
              for="event-start-time-1"
            >
              From
            </label>

            <input
              class="event__input event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${humanizePointDate(startDate)}"
            >

            &mdash;

            <label
              class="visually-hidden"
              for="event-end-time-1"
            >
              To
            </label>

            <input
              class="event__input event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${humanizePointDate(endDate)}"
            >
          </div>

          <div class="event__field-group event__field-group--price">
            <label
              class="event__label"
              for="event-price-1"
            >
              <span class="visually-hidden">
                Price
              </span>
              &euro;
            </label>

            <input
              class="event__input event__input--price"
              id="event-price-1"
              type="number"
              name="event-price"
              value="${price || 0}"
            >
          </div>

          <button
            class="event__save-btn btn btn--blue"
            type="submit"
          >
            Save
          </button>

          <button
            class="event__reset-btn"
            type="reset"
          >
            Delete
          </button>

          <button
            class="event__rollup-btn"
            type="button"
          >
            <span class="visually-hidden">
              Open event
            </span>
          </button>

        </header>

        <section class="event__details">

          <section class="event__section event__section--offers">
            <h3 class="event__section-title">
              Offers
            </h3>

            <div class="event__available-offers">
              ${createOffersTemplate(type, offers)}
            </div>
          </section>

          <section class="event__section event__section--destination">
            <h3 class="event__section-title">
              Destination
            </h3>

            <p class="event__destination-description">
              ${destination?.description || ''}
            </p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${createPhotosTemplate(destination?.pictures)}
              </div>
            </div>
          </section>

        </section>
      </form>
    </li>
  `;
}

export default class EditFormView extends AbstractStatefulView {
  #datepickerStart = null;
  #datepickerEnd = null;

  #handleFormSubmit = null;
  #handleEditClick = null;

  constructor({
    point,
    onFormSubmit,
    onEditClick
  }) {
    super();

    this._setState(point);

    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditClick = onEditClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate(this._state);
  }

  reset(point) {
    this.updateElement(point);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.#setDatepickers();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #setDatepickers() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        time_24hr: true,
        defaultDate: this._state.startDate
      }
    );

    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        time_24hr: true,
        defaultDate: this._state.endDate
      }
    );
  }
}
