/* 
En esta sesión vamos a utilizar funciones para operaciones matematicas
*/

function sum(a,b){
    return a+b;
}

let a,b;
a = parseInt(prompt("Ingresa numero"));
b = parseInt(prompt("Ingresa lo que le va a sumar"));
let result = sum(a,b);

document.write(`<h1>felicidades acabas de sumar y el resultado es: ${result}</h1> <br>`);