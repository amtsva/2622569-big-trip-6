export default class AbstractView {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    throw new Error('Method getTemplate must be implemented in child class');
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
