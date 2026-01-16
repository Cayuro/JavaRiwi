import { store } from '../state/store.js';

export function newTask() {
    setTimeout(() => {
        const btn = document.querySelector('#add-task-btn');
        btn?.addEventListener('click', () => {
            const title = document.querySelector('#task-title').value;
            if (title) {
                store.addTask(title); // Guarda y sincroniza con localStorage
                window.location.hash = '#/tasks';
            }
        });
    }, 0);

    return `
        <h2>Nueva Tarea</h2>
        <input type="text" id="task-title" placeholder="¿Qué hay que hacer?">
        <button id="add-task-btn">Agregar</button>
    `;
}