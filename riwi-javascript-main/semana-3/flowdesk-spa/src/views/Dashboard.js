import { store } from "../state/store.js";
import { render } from "../core/render.js";

export function Dashboard() {
  return `
    <h1>FlowDesk</h1>
    <section class="cards">
      <a href="#/projects"><div class="card">📁 
Proyectos: ${store.projects.length}</div></a>
      <div class="card">👥 Usuario: ${store.user ?? 'User no encontrado'}</div>
      <div class="card">✅ Tareas: ${store.projects.length}</div>
    </section>
    <button data-action="login">Simular Login</button>
    <button data-action="logout">Logout</button>
  `;
}

document.addEventListener('click', e =>{
  const action = e.target.dataset.action;

  if (!action) {
    return
  }
  if (action == 'login') {
    store.user = 'Calvo loco';
    render(Dashboard())
  }
  if (action == 'logout') {
    store.user = null;
    render(Dashboard())
  }

})