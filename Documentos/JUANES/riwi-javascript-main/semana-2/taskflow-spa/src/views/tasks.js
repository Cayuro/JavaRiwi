import { taskCard } from "../components/taskCard.js"
import { store } from "../state/store.js"

export function tasks(){
    // Si no hay tareas, le decimos que no hay y que agregue una
    if (store.tasks.length == 0) {
    return `
    <p>No tienes tareas pendientes. ¡Relájate!</p>
    <a href="#/newtask">Crear mi primera tarea</a>
    `
    }
    // Generamos el HTML de todas las tareas uniendo los strings con .join('')
    const taskHTML = store.tasks.map(task => taskCard(task).join(''))
    
    return`
    <div class="tasks-container">
            <h2>Lista de Tareas</h2>
            <div class="tasks-grid">
                ${taskHTML}
            </div>
            <br>
            <a href="#/newtask" class="btn-add">+ Nueva Tarea</a>
        </div>
    `
}