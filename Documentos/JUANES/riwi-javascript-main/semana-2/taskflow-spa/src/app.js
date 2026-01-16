import { navBar } from "./components/navBar.js";
import { footer } from "./components/footer.js";
import { taskCard } from "./components/taskCard.js";

const body = document.body;

export function render(view){
    const htmlDentro = `
    ${navBar()}
    ${taskCard()}
    <main id='app'>${view}</main>
    ${footer()}
    `
    body.innerHTML = htmlDentro
}

export function renderOut(view){
    const htmlFuera = `
    <main id='app'>${view}</main>
    ${footer()}
    `
    body.innerHTML = htmlFuera
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
