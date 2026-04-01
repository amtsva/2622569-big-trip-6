import Presenter from './presenter.js';
import PointsModel from './model/points-model.js';

const siteMainElement = document.querySelector('.trip-events');

if (!siteMainElement) {
  throw new Error('Element .trip-events not found in index.html');
}

const pointsModel = new PointsModel();
const presenter = new Presenter(siteMainElement, pointsModel);
presenter.init();
