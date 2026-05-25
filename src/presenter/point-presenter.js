import PointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace } from '../framework/render.js';

export default class PointPresenter {
  #point = null;
  #pointComponent = null;
  #editFormComponent = null;
  #pointListContainer = null;
  #onDataChange = null;
  #onModeChange = null;

  constructor({ pointListContainer, onDataChange, onModeChange }) {
    this.#pointListContainer = pointListContainer;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editFormComponent = new EditFormView({
      point: this.#point,
      onFormSubmit: this.#handleFormClose,
      onCancelClick: this.#handleFormClose
    });

    if (!prevPointComponent || !prevEditFormComponent) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    replace(this.#pointComponent, prevPointComponent);
    replace(this.#editFormComponent, prevEditFormComponent);
  }

  resetView() {
    if (this.#pointListContainer.contains(this.#editFormComponent.element)) {
      replace(this.#pointComponent, this.#editFormComponent);
    }
  }

  #replacePointToForm() {
    this.#onModeChange();
    replace(this.#editFormComponent, this.#pointComponent);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editFormComponent);
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormClose = () => {
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#onDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };
}
