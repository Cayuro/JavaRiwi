import { router } from "../router/router.js";

export function buttonCount(){
  return `
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
export function renderCounter() {
  
  const buttonAdd = document.getElementById('add');
  const buttonReset = document.getElementById('reset');
  const buttonSubtract = document.getElementById('minus');

  buttonAdd.onclick = () => {
    counter++;
    router();
  };
  buttonReset.onclick = ()=>{
    counter = 0;
    router();
  }
  buttonSubtract.onclick = ()=>{
    if (counter >0){counter--;}
    router();
  }
};