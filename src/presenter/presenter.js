import PointListView from '../view/point-list-view.js';
import EmptyPointsView from '../view/empty-points-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';

import { render, RenderPosition } from '../framework/render.js';

import { SortType, FilterType } from '../const.js';

const siteMainElement = document.querySelector('.trip-events');
const tripEventsElement = siteMainElement.querySelector('.trip-events__list');

export default class Presenter {
  #pointListComponent = new PointListView();
  #pointsModel = null;
  #filterModel = null;

  #currentSortType = SortType.DAY;

  #pointPresenters = new Map();

  constructor({ pointsModel, filterModel }) {
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  get points() {
    const points = [...this.#pointsModel.points];
    const filterType = this.#filterModel.filter;

    const filteredPoints = points.filter((point) => {
      switch (filterType) {
        case FilterType.FUTURE:
          return point.startDate > new Date();

        case FilterType.PRESENT:
          return (
            point.startDate <= new Date() &&
            point.endDate >= new Date()
          );

        case FilterType.PAST:
          return point.endDate < new Date();

        default:
          return true;
      }
    });

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(
          (pointA, pointB) =>
            (pointB.endDate - pointB.startDate) -
            (pointA.endDate - pointA.startDate)
        );

      case SortType.PRICE:
        return filteredPoints.sort(
          (pointA, pointB) => pointB.price - pointA.price
        );

      default:
        return filteredPoints.sort(
          (pointA, pointB) => pointA.startDate - pointB.startDate
        );
    }
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    const points = this.points;

    render(
      new SortView({
        currentSortType: this.#currentSortType,
        onSortTypeChange: this.#handleSortTypeChange,
      }),
      siteMainElement,
      RenderPosition.AFTERBEGIN
    );

    render(this.#pointListComponent, tripEventsElement);

    if (points.length === 0) {
      render(
        new EmptyPointsView({
          filterType: this.#filterModel.filter,
        }),
        this.#pointListComponent.element
      );

      return;
    }

    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointsModel.updatePoint(updatedPoint);

    this.#clearPointList();
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearPointList();
    this.#renderBoard();
  };

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    this.#pointListComponent.element.innerHTML = '';
  }
}
