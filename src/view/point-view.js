import AbstractView from './abstract-view.js';

export default class PointView extends AbstractView {
  getTemplate() {
    return `
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="2019-03-18">MAR 18</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
          </div>
          <h3 class="event__title">Taxi to Chamonix</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
            </p>
          </div>
          <p class="event__price">
            &euro; 120
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            <li class="event__offer">
              <span class="event__offer-title">Order Uber</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">20</span>
            </li>
          </ul>
          <button class="event__favorite-btn" type="button">
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
