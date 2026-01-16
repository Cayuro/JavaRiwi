export function login() {
    return `
    <form action="#/Home">
        <label for="userName">Name:</label>
        <input type="text" id="userName">

        <label for="userPassword">Password:</label>
        <input type="password" id="userPassword">

        <input type="submit">
    </form>    
    `
}