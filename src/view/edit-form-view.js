import AbstractView from './abstract-view.js';
import { TYPES, OFFERS } from '../const.js';

export default class EditFormView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  getTemplate() {
    const startDate = this.#point?.startDate || new Date();
    const endDate = this.#point?.endDate || new Date();

    const formatDateTime = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const startDateTime = formatDateTime(startDate);
    const endDateTime = formatDateTime(endDate);

    const type = this.#point?.type || 'flight';
    const destination = this.#point?.destination?.name || '';
    const price = this.#point?.price || '';

    const offersHtml = OFFERS.map((offer) => {
      const isChecked = this.#point?.offers?.some((o) => o.id === offer.id) || false;
      return `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer" ${isChecked ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `;
    }).join('');

    const typesHtml = TYPES.map((typeOption) => `
      <div class="event__type-item">
        <input id="event-type-${typeOption}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeOption}" ${type === typeOption ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${typeOption}" for="event-type-${typeOption}">${typeOption}</label>
      </div>
    `).join('');

    const cities = ['Amsterdam', 'Geneva', 'Chamonix', 'London', 'Paris', 'Berlin', 'Rome', 'Barcelona', 'Prague', 'Vienna'];
    const citiesHtml = cities.map((city) => `<option value="${city}"></option>`).join('');

    return `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                  ${typesHtml}
                </fieldset>
              </div>
            </div>
            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
              <datalist id="destination-list-1">
                ${citiesHtml}
              </datalist>
            </div>
            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateTime}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDateTime}">
            </div>
            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
            </div>
            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Cancel</button>
          </header>
          <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${offersHtml}
              </div>
            </section>
          </section>
        </form>
      </li>
    `;
  }
}
