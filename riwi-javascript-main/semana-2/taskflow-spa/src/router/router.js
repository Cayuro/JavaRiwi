import {render, renderOut} from '../app.js'
import {home,login,newTask,tasks,notFound} from '../views/index.js'
import { store } from '../state/store.js';

export function router(){
    const route = location.hash.toLowerCase();

    // Lógica de protección
    const privateRoutes = ['#/tasks', '#/newtask', '#/home'];
    
    if (privateRoutes.includes(route) && !store.user) {
        window.location.hash = '#/login';
        return;
    }
    // toda esta lógica impide que entren a la página

    switch (route) {
        case '#/home':
            render(home());
            break;
        case '#/login':
            renderOut(login());
            break;
        case '#/newtask':
            render(newTask());
            break;
        case '#/tasks':
            render(tasks());
            break;
        case '':
            renderOut(login());
            break;
        default:
            renderOut(notFound());
            break;
    }
}