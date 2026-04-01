// src/model/points-model.js
import { generatePoints } from '../mock/point-mock.js';

export default class PointsModel {
  #points = [];

  constructor() {
    this.#points = generatePoints(3); // 3 точки маршрута
  }

  getPoints() {
    return this.#points;
  }
}
