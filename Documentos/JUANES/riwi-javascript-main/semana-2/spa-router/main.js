const app = document.getElementById('app');

function renderHome() {
  app.innerHTML = '<h1>🏠 Home</h1>';
}

function renderServices() {
  app.innerHTML = '<h1>🛠️ Servicios</h1>';
}

function renderContact() {
  app.innerHTML = '<h1>📩 Contacto</h1>';
}

function renderNotFound() {
  app.innerHTML = '<h1>❌ 404</h1><p>Página no encontrada</p>';
}



function router() {
  const route = location.hash;

  if (route === '#/home') renderHome();
  else if (route === '#/services') renderServices();
  else if (route === '#/contact') renderContact();
  else renderNotFound();
}
/* //FUNCIÓN HACE LO MISMO PERO CON SWITCH más odenado

function router() {
  const route = location.hash;
  
  switch (route) {
    case '#/home':
      renderHome();
      break;
    case '#/services':
      renderServices();
      break;
    case '#/contact':
      renderContact();
      break;
    default:
      renderNotFound();
  } 
}*/

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

let counter = 0;

function renderCounter() {
  app.innerHTML = `
    <h1>Contador</h1>
    <p>${counter}</p>
    <button id="add">+</button>
  `;

  document.getElementById('add').onclick = () => {
    counter++;
    renderCounter();
  };
}
renderCounter();