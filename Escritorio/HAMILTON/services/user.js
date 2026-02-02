export const getUsers = async ()=>{
    try {
        const response = await fetch('http://localhost:3001/usuarios')
        const usuarios = await response.json()
        return usuarios
    }
    catch (error) {
        console.log(`Hubo un pequeño error: ${error}`)
    }
}

// http://localhost:3000/usuarios?email=juan_gomez@g.com

export const getUsersByEmail = async (email)=>{
    try {
        const response = await fetch(`http://localhost:3000/usuarios?email=${email}`)
        const usuario = await response.json()
        return usuario
    }
    catch (error) {
        console.log(`Hubo un pequeño error: ${error}`)
    }
}

export const createUser = async (userData)=>{
    try {
        // Check if user already exists
        const existingUsers = await getUsersByEmail(userData.email);
        if (existingUsers.length > 0) {
            return null; // User already exists
        }

        // Generate unique ID
        const users = await getUsers();
        const maxId = users.length > 0 ? Math.max(...users.map(u => parseInt(u.id))) : 0;
        const newId = (maxId + 1).toString();

        const newUser = {
            id: newId,
            name: userData.name,
            email: userData.email,
            age: userData.age,
            city: userData.city,
            password: userData.password,
            role: userData.role || 'user'
        };

        const response = await fetch('http://localhost:3001/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            return newUser;
        } else {
            throw new Error('Error creating user');
        }
    }
    catch (error) {
        console.log(`Error creating user: ${error}`)
        return null;
    }
}
