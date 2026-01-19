import { store } from '../state/store.js';

export function NewTask() {

  setTimeout(() => {
    document.querySelector('#add').addEventListener('click', () => {
      const title = document.querySelector('#title').value;
      store.addTask(title);
      location.hash = '#/tasks';
    });
  }, 0);

  return `
    <h2>Nueva Tarea</h2>
    <input id="title" placeholder="Título" />
    <button id="add">Agregar</button>
  `;
}
