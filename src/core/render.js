import { Navbar } from "../components/Navbar.js"

const app = document.getElementById('app')


export function render(content) {
    const user = JSON.parse(sessionStorage.getItem('user')) || null
        return app.innerHTML =` 
        ${user ? Navbar() : ""}
        ${content}
    `
}