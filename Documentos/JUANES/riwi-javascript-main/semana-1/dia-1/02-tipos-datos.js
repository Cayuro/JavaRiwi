/*
Declara variables de distintos tipos.
Muestra el tipo de cada una usando typeof.
*/

//STRING
let name = "Juanes";
const residence = "Colombiano";
const initialMessage = "Welcome";

// NUMEROS
let int = 50;
let dec = 10.33;
let negative = -22;
let age = 25;

// ARRAY
let books = ["principito","el olvido que seremos", "el viejo y el mar"];
let fruits = ["banana", "peach", "apple", "pineapple"];

//OBJECT 
const materias = {
    fisica: ["Juanes", "pedro", "Andrés"],
    matematica: ["Juanes", "Antonio", "Camilo"],
}

document.writeln(typeof(materias));
document.writeln(typeof(books));
document.writeln(typeof(int));
document.writeln(typeof(name));