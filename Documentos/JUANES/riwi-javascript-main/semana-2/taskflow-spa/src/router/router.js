import {render, renderOut} from '../app.js'
import {home,login,newTask,tasks,notFound} from '../views/index.js'


export function router(){
    const route = location.hash;

    switch (route) {
        case '#/home':
            render(home());
            break;
        case '#/login':
            render(login());
            break;
        case '#/newTask':
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