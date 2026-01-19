import { store } from '../state/store.js';

export function Login() {

  setTimeout(() => {
    const form = document.querySelector('#login-form');

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.querySelector('#name').value;
      store.setUser(name);
      location.hash = '#/';
    });
  }, 0);

  return `
    <h2>Login</h2>
    <form id="login-form">
      <input id="name" required placeholder="Nombre" />
      <button>Ingresar</button>
    </form>
  `;
}
