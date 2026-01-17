const app = document.getElementById('app');

function renderHome() {
  app.innerHTML = '<h1>🏠 Home</h1>';

  
}

function renderServices() {
  app.innerHTML = '<h1>🛠️ Servicios</h1>';
}

function renderContact() {
  app.innerHTML = `
  <h1>📩 Contacto</h1>`
}

function renderNotFound() {
  app.innerHTML = '<h1>❌ 404</h1><p>Página no encontrada</p>';
}
function tin(){
  return `
    <h1>Contador</h1>
    <p>${counter}</p>
    <p>raíz cuadrada: ${Math.fround((counter**(1/2)))}</p>
    <p>Al cuadrado:${counter**2} </p>
    <div>
    <button id="minus">-</button>
    <button id="reset">reset</button>
    <button id="add">+</button>
    </div>`
}
let counter = 0;
function renderCounter() {
  app.innerHTML = tin();
  
  const buttonAdd = document.getElementById('add');
  const buttonReset = document.getElementById('reset');
  const buttonSubtract = document.getElementById('minus');

  buttonAdd.onclick = () => {
    counter++;
    renderCounter();
  };
  buttonReset.onclick = ()=>{
    counter = 0;
    renderCounter();
  }
  buttonSubtract.onclick = ()=>{
    if (counter >0){counter--;}
    renderCounter();
  }

};


function router() {
  const route = location.hash;

  if (route === '#/home') renderHome();
  else if (route === '#/services') renderServices();
  else if (route === '#/contact') renderContact();
  else if (route === '#/counter') renderCounter();
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
    case '#/counter':
      renderCounter();
      break
    default:
      renderNotFound();
  } 
}*/

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

//ESTO TAMBIÉN LO QUIERO SUBIR
