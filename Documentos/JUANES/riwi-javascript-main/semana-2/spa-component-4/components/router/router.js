import { Home } from '../views/home.js';
import { Contact } from '../views/contact.js';
import { Services } from '../views/services.js';
import { NotFound } from '../views/notFound.js';
import { render } from '../app.js';

export function router(){
    const route = location.hash;

    switch (route) {
        case '#/home':
            render(Home());
            break;
        case '#/services':
            render(Services());
            break;
        case '#/contact':
            render(Contact());
            break;
        case '':
            render(Home());
            break;
        default:
            render(NotFound());
            break;
    }
}