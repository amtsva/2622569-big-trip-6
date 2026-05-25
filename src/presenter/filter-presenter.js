import FiltersView from '../view/filters-view.js';

import { render, RenderPosition } from '../framework/render.js';

import { UpdateType } from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;

  #filterModel = null;

  #filtersComponent = null;

  constructor({ filterContainer, filterModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
  }

  init() {
    this.#filtersComponent = new FiltersView({
      currentFilter: this.#filterModel.filter,
      onFilterChange: this.#handleFilterChange
    });

    render(
      this.#filtersComponent,
      this.#filterContainer,
      RenderPosition.AFTERBEGIN
    );
  }

  #handleFilterChange = (filterType) => {
    this.#filterModel.setFilter(
      UpdateType.MAJOR,
      filterType
    );
  };
}
