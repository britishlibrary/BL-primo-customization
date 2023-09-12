import template from './page.hbs';

export function render(options) {
  document.body.innerHTML = template(options);
}

export function destroy() {
  document.body.innerHTML = "";
}