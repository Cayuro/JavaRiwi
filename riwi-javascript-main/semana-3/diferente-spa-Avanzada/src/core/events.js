
import { store } from '../state/store.js';
import { render } from './render.js';
import { Dashboard } from '../views/Dashboard.js';

document.addEventListener('click', (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  if (action === 'login') {
    store.user = 'Angela';
    render(Dashboard());
  }

  if (action === 'logout') {
    store.user = null;
    render(Dashboard());
  }
});