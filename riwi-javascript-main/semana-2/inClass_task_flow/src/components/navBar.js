import { store } from '../state/store.js';

export function Navbar() {
  return `
    <nav>
      <a href="#/">Home</a>
      <a href="#/tasks">Tasks</a>
      <a href="#/new-task">New Task</a>
      ${
        store.user
          ? `<span style="color:white">${store.user.toUpperCase()}</span>
             <a href="#/login" id="logout">Logout</a>`
          : ''
      }
    </nav>
  `;
}
