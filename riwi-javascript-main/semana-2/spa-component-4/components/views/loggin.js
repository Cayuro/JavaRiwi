export function loggin(){
    return `<form id="formulario"><label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required><br><br>

            <label for="contraseña">Contraseña:</label>
            <input type="password" id="contraseña" name="contraseña" required><br><br>

            <button type="submit">Enviar</button>
            </form>`
}

export function formm() {
    const form = document.getElementById('formulario')
    
form.addEventListener('click', ()=> {
    if(!formm){return};

    const nombre = document.getElementById('nombre');
    const contraseña = document.getElementById('contraseña')
    if (nombre == 'juanes' && contraseña == '1234') {
        location.hash = '#/home'
    } else {
        alert('ingrese bien bobo hpta')
    }
})

}