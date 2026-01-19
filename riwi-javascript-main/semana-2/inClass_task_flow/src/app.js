import { Navbar } from './components/navBar.js';
import { Footer } from './components/footer.js';
import { router } from './router/router.js';
import { store } from './state/store.js';

const root = document.querySelector('#root');

export function render(view) {
  root.innerHTML = `
    ${Navbar()}
    <main>${view}</main>
    ${Footer()}
  `;

  // Logout
  const logout = document.querySelector('#logout');
  logout?.addEventListener('click', () => {
    store.logout();
  });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
