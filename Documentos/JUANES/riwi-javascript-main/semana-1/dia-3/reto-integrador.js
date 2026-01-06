/*
Crea un programa que evalúe una nota y muestre si aprueba o reprueba,
usando funciones, condicionales y ciclos.
*/



function matAprovation(nombre,nota){
    let aprove = false;
    if(nota >= 3){
        aprove = true;
    }
    console.log(`${nombre} aprove the course: ${aprove}`)
}

matAprovation("Juanes",4)

let  counter= 0;
console.log(counter);  //  ->  undefined
{
         let counter  =  1;
         console.log(counter);
         counter += 2; //  ->  1
}
counter  =  counter  +  1;
console.log(counter);  //  ->  2
{
    let counter;
    while(counter <10){
        counter = counter + 1
    }
}
console.log(counter)

// const contenedor = document.querySelector("body");
// const h1DOM = document.createElement("H1");

// let contador = 10;

// h1DOM.textContent= contador;
// contenedor.appendChild(h1DOM);

// for (let i = 10; i > 0; i--) {

//     setTimeout(() => {
//         contador--;
//         h1DOM.textContent = contador;
//         if (contador==0) {
//         contenedor.style.backgroundColor= "red";
//         h1DOM.style.color= "white";
//     }
//     }, i*500);
    
// }

const contenedor = document.querySelector("body");
const h1DOM = document.createElement("H1");
contenedor.appendChild(h1DOM);

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function iniciarCuentaRegresiva() {
    let contador = 10;
    
    // Usamos un bucle que decrementa hasta 0
    for (let i = contador; i >= 0; i--) {
        // 1. Actualizamos el texto primero
        h1DOM.textContent = i;

        // 2. Si llegamos a 0, cambiamos el color y terminamos
        if (i === 0) {
            contenedor.style.backgroundColor = "red";
            h1DOM.style.color= "white";
            h1DOM.style.justifySelf= "center";
            h1DOM.style.margin= "200px";
            break; // Salimos del bucle
        }

        // 3. ESPERAMOS un segundo antes de volver a empezar el bucle
        await esperar(500);
    }
}

iniciarCuentaRegresiva();