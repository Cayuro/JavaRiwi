const app = document.getElementById('app');

// ====== LO QUE RENDERIZA EL VIEW =========

function Home() {
  return '<h1>🏠 Home</h1>';  
}

function Services() {
  return '<h1>🛠️ Servicios</h1>';
}

function Contact() {
  return `<h1>📩 Contacto</h1>`
}

function renderNotFound() {
  app.innerHTML = '<h1>❌ 404</h1><p>Página no encontrada</p>';
}

// ==== el botón no lo pongo como componente ======

function buttonCount(){
  return `
    ${navBar}
    <h1>Contador</h1>
    <p>${counter}</p>
    <p>raíz cuadrada: ${Math.fround((counter**(1/2)))}</p>
    <p>Al cuadrado:${counter**2} </p>
    <div>
    <button id="minus">-</button>
    <button id="reset">reset</button>
    <button id="add">+</button>
    </div>`;
}

let counter = 0;
function renderCounter() {
  app.innerHTML = buttonCount();
  
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
// =========== NAV BAR - LO FIJO ==============

function navBar(){
    return `
    <nav>
        <a href="#/home" id="home" class="btn">Home</a>
        <a href="#/services" id="services" class="btn">Service</a>
        <a href="#/contact" id="contact" class="btn">Contact</a>
        <a href="#/counter">+</a>
        <a href="#/VAINA" id="contact" class="btn">VAINA</a>
    </nav>
    `;
}


// ========== RENDER ==========
function render(view){
    app.innerHTML = `
    ${navBar()}
    <main>
        ${view}
    </main>
    `;
}

// ROUTER LA FORMA COMO LOS LLAMA
/* 
function router() {
  const route = location.hash;

  if (route === '#/home') render(Home());
  else if (route === '#/services') render(Services());
  else if (route === '#/contact') render(Contact());
//   else if (route === '#/counter') renderCounter(); //tiene un problema por que no renderizaría lo otro
  else render(Home());
} */

//FUNCIÓN HACE LO MISMO PERO CON SWITCH más odenado

function router() {
  const route = location.hash;
  
  switch (route) {
    case '#/home':
      render(Home());
      break;
    case '#/services':
      render(Services());
      break;
    case '#/contact':
      render(Contact());
      break;
    case '#/counter': // unico que no tengo con render
      renderCounter();
      break
    default:
      render(Home());
  } 
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
