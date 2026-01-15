const app = document.getElementById('app');

function renderHome(){
    app.innerHTML = '<h1>Home</h1><p>bienvanido a nuestra SPA</p>'
}
function renderServices(){
    app.innerHTML = '<h1>Services</h1><p>Frontend con JS</p>'
}
function renderContact(){
    app.innerHTML = '<h1>Contact</h1><p>clan@hamilton.dev</p>'
}
renderHome()
document.getElementById('home').addEventListener('click',renderHome)
document.getElementById('services').addEventListener('click',renderServices)
document.getElementById('contact').addEventListener('click',renderContact)

// todo esto subirlos