import { getUsersByEmail } from "../services/user.js";
import { setSession, getSession, navigate, updateNavbar } from "../app.js";

export const initLogin = async () => {
    // Check if already logged in
    const session = getSession();
    if (session) {
        redirectByRole(session);
        return;
    }

    const inputUser = document.getElementById('login-input');
    const password = document.getElementById('login-pass');
    const btnSend = document.getElementById('login-form')?.querySelector('button[type="submit"]');
    const errorMsg = document.getElementById('login-error');

    let userEmail = '';
    let userPass = '';

    inputUser.addEventListener('input', (event) => {
        userEmail = event.target.value;
        if (errorMsg) errorMsg.style.display = 'none';
    });

    password.addEventListener('input', (event) => {
        userPass = event.target.value;
        if (errorMsg) errorMsg.style.display = 'none';
    });

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!userEmail || !userPass) {
                showError('Por favor ingresa email y contraseña');
                return;
            }

            try {
                const userFound = await getUsersByEmail(userEmail);

                if (userFound.length === 0) {
                    showError('Usuario no encontrado');
                    return;
                }

                const user = userFound[0];

                if (userPass === user.password) {
                    // Login successful
                    console.log('Permitir ingreso');
                    setSession(user);
                    redirectByRole(user);
                } else {
                    showError('Contraseña incorrecta');
                }
            } catch (error) {
                showError('Error al iniciar sesión');
                console.error(error);
            }
        });
    }
};

function redirectByRole(user) {
    if (user.role === 'admin') {
        navigate('#adminOrders');
    } else {
        navigate('#menu');
    }
}

function showError(message) {
    const errorMsg = document.getElementById('login-error');
    if (errorMsg) {
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    } else {
        alert(message);
    }
}

export const handleLogin = async (email, password) => {
    const userFound = await getUsersByEmail(email);
    
    if (userFound.length === 0) {
        return { success: false, message: 'Usuario no encontrado' };
    }

    const user = userFound[0];

    if (password === user.password) {
        setSession(user);
        return { success: true, user };
    } else {
        return { success: false, message: 'Contraseña incorrecta' };
    }
};
