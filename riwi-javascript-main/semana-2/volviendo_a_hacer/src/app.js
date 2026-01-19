import { navBar } from "./components/navBar.js"
import { footer } from "./components/footer.js"
import { router } from "./router/router.js";

const app = document.getElementById('app');

export function render(view){

    app.innerHTML = `
    ${navBar()}
    <main>${view}</main>
    ${footer()}
    `
}

window.addEventListener('hashchange', router)
window.addEventListener('load', router)