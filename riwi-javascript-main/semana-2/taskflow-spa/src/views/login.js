import { store } from '../state/store.js';

export function login() {
    // Escuchamos el evento después de que el HTML se inyecte
    setTimeout(() => {
        const form = document.querySelector('#login-form');
        if(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.querySelector('#userName').value;
                store.setUser(name); // Guardamos en store y localStorage
                window.location.hash = '#/home'; // Redirigimos
            });
        }
    }, 0);

    return `
    <form id="login-form">
        <label>Name:</label>
        <input type="text" id="userName" required>
        <input type="submit" value="Ingresar">
    </form>`;
}