function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function render(component, container, place = 'beforeend') {
  container.insertAdjacentElement(place, component.element);
}

function replace(newComponent, oldComponent) {
  if (oldComponent.element.parentElement === null) {
    return;
  }

  oldComponent.element.parentElement.replaceChild(
    newComponent.element,
    oldComponent.element
  );
}

export { createElement, render, replace };
