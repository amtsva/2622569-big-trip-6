import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import PointListView from './view/point-list-view.js';
import PointView from './view/point-view.js';
import EditFormView from './view/edit-form-view.js';

export default class Presenter {
  #container = null;
  #pointsModel = null;
  #pointListComponent = null;

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#container.innerHTML = '';

    const filtersComponent = new FiltersView();
    this.#container.appendChild(filtersComponent.getElement());

    const sortComponent = new SortView();
    this.#container.appendChild(sortComponent.getElement());

    this.#pointListComponent = new PointListView();
    this.#container.appendChild(this.#pointListComponent.getElement());

    const points = this.#pointsModel.getPoints();

    const firstPoint = points[0];
    const editFormComponent = new EditFormView(firstPoint);
    this.#pointListComponent.getElement().appendChild(editFormComponent.getElement());

    for (const point of points) {
      const pointComponent = new PointView(point);
      this.#pointListComponent.getElement().appendChild(pointComponent.getElement());
    }
  }
}
