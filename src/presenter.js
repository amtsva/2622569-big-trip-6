import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import PointListView from './view/point-list-view.js';
import PointView from './view/point-view.js';
import EditFormView from './view/edit-form-view.js';

export default class Presenter {
  #container = null;
  #pointsModel = null;
  #pointListComponent = null;
  #currentPointComponent = null;

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#container.innerHTML = '';

    const filtersComponent = new FiltersView();
    this.#container.appendChild(filtersComponent.element);

    const sortComponent = new SortView();
    this.#container.appendChild(sortComponent.element);

    this.#pointListComponent = new PointListView();
    this.#container.appendChild(this.#pointListComponent.element);

    const points = this.#pointsModel.getPoints();

    for (const point of points) {
      this.#renderPoint(point);
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointView({
      point: point,
      onEditClick: () => this.#replacePointToEditForm(point)
    });

    this.#pointListComponent.element.appendChild(pointComponent.element);
  }

  #replacePointToEditForm(point) {
    const editFormComponent = new EditFormView({
      point: point,
      onFormSubmit: () => this.#replaceEditFormToPoint(point),
      onCancelClick: () => this.#replaceEditFormToPoint(point)
    });

    this.#pointListComponent.element.replaceChild(
      editFormComponent.element,
      this.#pointListComponent.element.querySelector('.trip-events__item')
    );
  }

  #replaceEditFormToPoint(point) {
    const pointComponent = new PointView({
      point: point,
      onEditClick: () => this.#replacePointToEditForm(point)
    });

    this.#pointListComponent.element.replaceChild(
      pointComponent.element,
      this.#pointListComponent.element.querySelector('.trip-events__item')
    );
  }
}
