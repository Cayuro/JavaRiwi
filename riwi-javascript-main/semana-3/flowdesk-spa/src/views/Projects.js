import { store } from '../state/store.js';

export function Projects() {
  return `
    <h2>Proyectos</h2>
    <ul>
      ${store.projects
        .map(p => `<li><a href="#/projects/${p.id}">${p.name}</a></li>`)
        .join('')}
    </ul>
  `;
}