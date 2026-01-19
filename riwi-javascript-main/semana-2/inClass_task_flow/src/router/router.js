import { Home } from '../views/home.js';
import { Login } from '../views/login.js';
import { Tasks } from '../views/tasks.js';
import { NewTask } from '../views/newTask.js';
import { NotFound } from '../views/notFound.js';
import { store } from '../state/store.js';
import { render } from '../app.js';

export function router() {
  const route = location.hash || '#/';

  // Rutas protegidas
  const privateRoutes = ['#/tasks', '#/new-task'];

  if (privateRoutes.includes(route) && !store.user) {
    location.hash = '#/login';
    return;
  }

  switch (route) {
    case '#/':
      render(Home());
      break;
    case '#/login':
      render(Login());
      break;
    case '#/tasks':
      render(Tasks());
      break;
    case '#/new-task':
      render(NewTask());
      break;
    default:
      render(NotFound());
  }
}
