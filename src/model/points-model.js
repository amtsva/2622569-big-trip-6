import { generatePoints } from '../mock/point-mock.js';
import { FilterType } from '../const.js';

export default class PointsModel {
  #points = [];

  constructor() {
    this.#points = generatePoints(3);
  }

  getPoints() {
    return this.#points;
  }

  getPointsCount() {
    return this.#points.length;
  }

  getPointsByFilter(filterType) {
    const now = new Date();

    switch (filterType) {
      case FilterType.FUTURE:
        return this.#points.filter(
          (point) => point.startDate > now
        );

      case FilterType.PAST:
        return this.#points.filter(
          (point) => point.endDate < now
        );

      case FilterType.PRESENT:
        return this.#points.filter(
          (point) =>
            point.startDate <= now &&
            point.endDate >= now
        );

      default:
        return this.#points;
    }
  }

  updatePoint(updatedPoint) {
    this.#points = this.#points.map(
      (point) =>
        point.id === updatedPoint.id
          ? updatedPoint
          : point
    );
  }
}
