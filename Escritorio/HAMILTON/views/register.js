import { createUser } from "../services/user.js";
import { setSession, navigate } from "../app.js";

export const initRegister = async () => {
    const registerForm = document.getElementById('register-form');
    const errorMsg = document.getElementById('register-error');

    let userData = {
        name: '',
        email: '',
        age: '',
        city: '',
        password: '',
        role: 'user' // Default role
    };

    const inputs = {
        name: document.getElementById('register-name'),
        email: document.getElementById('register-email'),
        age: document.getElementById('register-age'),
        city: document.getElementById('register-city'),
        password: document.getElementById('register-password')
    };

    // Add event listeners for inputs
    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener('input', (event) => {
            userData[key] = event.target.value;
            if (errorMsg) errorMsg.style.display = 'none';
        });
    });

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Validate required fields
            if (!userData.name || !userData.email || !userData.age || !userData.city || !userData.password) {
                showError('Por favor completa todos los campos');
                return;
            }

            try {
                const newUser = await createUser(userData);

                if (newUser) {
                    // Registration successful
                    console.log('Usuario registrado exitosamente');
                    setSession(newUser);
                    navigate('#menu'); // Redirect to menu after registration
                } else {
                    showError('El email ya está registrado');
                }
            } catch (error) {
                showError('Error al registrar usuario');
                console.error(error);
            }
        });
    }
};

function showError(message) {
    const errorMsg = document.getElementById('register-error');
    if (errorMsg) {
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    } else {
        alert(message);
    }
}
