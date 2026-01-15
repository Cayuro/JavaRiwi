import { Home } from '../views/home.js';
import { Contact } from '../views/contact.js';
import { Services } from '../views/services.js';
import { NotFound } from '../views/notFound.js';
import { render } from '../app.js';
import { buttonCount,renderCounter } from '../views/counter.js';
import { loggin } from '../views/loggin.js';


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
        case '#/counter':
            render(buttonCount());
            renderCounter();
            break
        case '#/loggin':
        document.body.innerHTML = loggin();
            break;
        case '':
            document.body.innerHTML = loggin();
            break;
        default:
            render(NotFound());
            break;
    }
}