import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

export default class EmptyPointsView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    let message = 'Click New Event to create your first point';

    switch (this.#filterType) {
      case FilterType.PAST:
        message = 'There are no past events now';
        break;
      case FilterType.PRESENT:
        message = 'There are no present events now';
        break;
      case FilterType.FUTURE:
        message = 'There are no future events now';
        break;
      default:
        message = 'Click New Event to create your first point';
        break;
    }

    return `<p class="trip-events__msg">${message}</p>`;
  }
}
