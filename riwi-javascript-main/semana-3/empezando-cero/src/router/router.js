import { dashboard } from '../views/dashboard.js';
import {render} from '../core/render.js';
import { notFound } from '../views/notFound.js';

export function router(){
    const route = location.hash;

    switch (route) {
        case '#/home':
            render(dashboard());
            break;    
        case '':
            render(notFound());
            break;
        default:
            render(dashboard());
    }
}

