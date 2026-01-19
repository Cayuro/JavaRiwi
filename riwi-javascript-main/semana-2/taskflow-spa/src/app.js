import { navBar } from "./components/navBar.js";
import { footer } from "./components/footer.js";
import { taskCard } from "./components/taskCard.js";
import { router } from "./router/router.js";

const body = document.body;

export function render(view){
    body.innerHTML = `
    ${navBar()}
    <main id='app'>${view}</main>
    ${footer()}
    `
}

export function renderOut(view){
    body.innerHTML= `
    <main id='app'>${view}</main>
    ${footer()}
    `
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
