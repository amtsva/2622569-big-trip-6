import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortItemTemplate(type, currentSortType) {
  const isChecked = type === currentSortType
    ? 'checked'
    : '';

  return `
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input
        id="sort-${type}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${type}"
        data-sort-type="${type}"
        ${isChecked}
      >

      <label
        class="trip-sort__btn"
        for="sort-${type}"
      >
        ${type}
      </label>
    </div>
  `;
}

function createSortTemplate(currentSortType) {
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortItemTemplate(SortType.DAY, currentSortType)}
      ${createSortItemTemplate(SortType.TIME, currentSortType)}
      ${createSortItemTemplate(SortType.PRICE, currentSortType)}
    </form>
  `;
}

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();

    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener(
      'change',
      this.#sortTypeChangeHandler
    );
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();

    const sortType = evt.target.dataset.sortType;

    if (!sortType) {
      return;
    }

    this.#handleSortTypeChange(sortType);
  };
}
