export function footer(){
    return `
    <footer>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required><br><br>

            <label for="contraseña">Contraseña:</label>
            <input type="password" id="contraseña" name="contraseña" required><br><br>

            <button type="submit">Enviar</button>
    </footer>
    `
}