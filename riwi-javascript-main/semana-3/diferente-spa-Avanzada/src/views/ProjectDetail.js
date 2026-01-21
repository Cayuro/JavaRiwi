import { store } from '../state/store.js';

export function ProjectDetail(id) {
  const project = store.projects.find(p => p.id == id);

  if (!project) {
    return `
      <p>Proyecto no encontrado</p>
      <a href="#/projects">⬅ Volver</a>
    `;
  }

  return `
    <h2>${project.title}</h2>
    <br>ID: ${project.id}</br>
    <br>NOMBRE: ${project.title}</br>
    <br>ESTADO: ${project.status}</br>
    <br/>
    <a href="#/projects">⬅ Volver</a>
  `;
}