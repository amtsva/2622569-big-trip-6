export default class AbstractView {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    throw new Error('Метод getTemplate должен быть реализован в дочернем классе');
  }

  getElement() {
    if (!this.element) {
      this.element = this.createElement(this.getTemplate());
    }
    return this.element;
  }

  createElement(template) {
    const container = document.createElement('div');
    container.innerHTML = template;
    return container.firstElementChild;
  }
}
