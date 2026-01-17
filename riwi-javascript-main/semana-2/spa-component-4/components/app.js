import { navBar } from "./navBar.js";
import { router } from "./router/router.js";
import { footer } from "./footer.js"; 

const body = document.body;

// ========== RENDER ==========
export function render(view){
    body.innerHTML = `
    <header>${navBar()}</header>
    <main>
        ${view}
    </main>
    ${footer()}
    `
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
