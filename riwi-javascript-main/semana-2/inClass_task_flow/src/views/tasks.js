import { store } from '../state/store.js';
import { TaskCard } from '../components/taskCard.js';

export function Tasks() {

  setTimeout(() => {
    document.querySelectorAll('button').forEach(btn => {
      const id = Number(btn.dataset.id);

      if (btn.dataset.action === 'toggle') {
        btn.onclick = () => {
          store.toggleTask(id);
          location.reload();
        };
      }

      if (btn.dataset.action === 'delete') {
        btn.onclick = () => {
          store.deleteTask(id);
          location.reload();
        };
      }

      if (btn.dataset.action === 'edit') {
        btn.onclick = () => {
          const newTitle = prompt('Nuevo título');
          if (newTitle) {
            store.editTask(id, newTitle);
            location.reload();
          }
        };
      }
    });
  }, 0);

  return `
    <h2>Tareas</h2>
    ${store.tasks.map(TaskCard).join('')}
  `;
}
