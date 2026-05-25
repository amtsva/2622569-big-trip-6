import Presenter from './presenter.js';
import PointsModel from './model/points-model.js';


const siteMainElement = document.querySelector('.trip-events__list-container');

if (!siteMainElement) {
  throw new Error('Element .trip-events__list-container not found in index.html');
}

const pointsModel = new PointsModel();
const presenter = new Presenter(siteMainElement, pointsModel);
presenter.init();
