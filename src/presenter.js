import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import PointListView from './view/point-list-view.js';
import EmptyPointsView from './view/empty-points-view.js';

import PointPresenter from './presenter/point-presenter.js';

import { render } from './framework/render.js';
import { FilterType } from './const.js';

export default class Presenter {
  #container = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #filtersComponent = null;
  #sortComponent = null;
  #emptyPointsComponent = null;

  #currentFilter = FilterType.EVERYTHING;

  #pointPresenters = new Map();

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#container.innerHTML = '';

    this.#filtersComponent = new FiltersView({
      currentFilter: this.#currentFilter,
      onFilterChange: this.#handleFilterChange
    });

    this.#sortComponent = new SortView();

    render(this.#filtersComponent, this.#container);
    render(this.#sortComponent, this.#container);
    render(this.#pointListComponent, this.#container);

    this.#renderPoints();
  }

  #handleFilterChange = (filterType) => {
    this.#currentFilter = filterType;

    this.#clearPointsList();
    this.#renderPoints();
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsModel.updatePoint(updatedPoint);

    this.#pointPresenters
      .get(updatedPoint.id)
      .init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearPointsList() {
    this.#pointListComponent.element.innerHTML = '';
    this.#pointPresenters.clear();
  }

  #renderPoints() {
    const points = this.#pointsModel.getPointsByFilter(this.#currentFilter);

    if (points.length === 0) {
      this.#renderEmptyPoints();
      return;
    }

    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderEmptyPoints() {
    this.#emptyPointsComponent = new EmptyPointsView(this.#currentFilter);

    render(
      this.#emptyPointsComponent,
      this.#pointListComponent.element
    );
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
