import { home, services, contact } from "../views/index.js"
import { render } from "../app.js";

export function router(){
    const route = location.hash

    switch (route) {
        case '#/home':
            render(home())
            break;
        case '#/contact':
            render(contact())
            break;
        case '#/services':
            render(services())
            break;
        case '':
            render(home())
            break;
    
        default:
            render(home())
            break;
    }
}