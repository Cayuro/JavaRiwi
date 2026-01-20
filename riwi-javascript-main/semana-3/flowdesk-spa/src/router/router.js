import { render } from '../core/render.js';
import { Dashboard } from '../views/Dashboard.js';
import { Projects } from '../views/Projects.js';
import { ProjectDetail } from '../views/ProjectDetail.js';

export function router() {
  const hash = location.hash || '#/dashboard';
  const [, route, param] = hash.split('/');

  switch (route) {
    case 'dashboard':
      render(Dashboard());
      break;

    case 'projects':
      if (param) {
        render(ProjectDetail(param));
      } else {
        render(Projects());
      }
      break;

    default:
      render(Dashboard());
  }
}