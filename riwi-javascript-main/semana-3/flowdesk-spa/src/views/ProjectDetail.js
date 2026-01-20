import { store } from '../state/store.js';

export function ProjectDetail(id) {
  const project = store.projects.find(p => p.id == id);

  if (!project) {
    return '<p>Proyecto no encontrado</p>';
  }

  return `
    <h2>${project.name}</h2>
    <p>Estado: ${project.status}</p>
    <a href="#/projects">⬅ Volver</a>
  `;
}