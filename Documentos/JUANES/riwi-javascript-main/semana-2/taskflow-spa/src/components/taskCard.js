export function taskCard(task) {
    return `
        <div class="card ${task.completed ? 'completed' : ''}" id="task-${task.id}">
            <h3>${task.title}</h3>
            <p>Estado: <strong>${task.completed ? '✅ Completada' : '⏳ Pendiente'}</strong></p>
            ${!task.completed ? `<button onclick="completeTask(${task.id})">Marcar como lista</button>` : ''}
        </div>
    `;
}