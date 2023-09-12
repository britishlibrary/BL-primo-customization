import '../styles/main.scss';
import someFunction from './someModule';
import someImage from '../img/beta-service-logo.png';
import { render, destroy } from '../templates/page';

// DOMContentLoaded to ensure the DOM is ready before running our script
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  const options = {
    name: "Alex"
  }

  render(options);

  if (module.hot) {
    module.hot.accept();
    destroy();
    render(options);
  }

  // Call some functions or methods to bootstrap your application
  someFunction();

  // Example: Add an image to the DOM
  const imgElement = document.createElement('img');
  imgElement.src = someImage;
  document.body.appendChild(imgElement);
});
