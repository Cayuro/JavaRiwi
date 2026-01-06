/*
Evalúa si una persona es mayor de edad.
*/
let age = prompt("How old are you? ");
let isGreater = false;

if (age>=18) {
    isGreater = true;
    alert("You are an adult, you can drink");
} else {
    alert("Stop");
}
