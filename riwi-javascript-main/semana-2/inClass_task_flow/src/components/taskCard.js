export function TaskCard(task) {
  return `
    <div class="card ${task.completed ? 'completed' : ''}">
      <h3 class="${task.completed ? 'completed' : ''}">${task.title} </h3>
      <p>Estado: ${task.completed ? 'Completada' : 'Pendiente'}</p>

      <button data-action="toggle" data-id="${task.id}">
        Completar
      </button>

      <button data-action="edit" data-id="${task.id}">
        Editar
      </button>

      <button data-action="delete" data-id="${task.id}">
        Eliminar
      </button>
    </div>
  `;
}
