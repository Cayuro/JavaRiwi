export const getUsers = async ()=>{
    try {
        const response = await fetch('http://localhost:3000/usuarios')
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