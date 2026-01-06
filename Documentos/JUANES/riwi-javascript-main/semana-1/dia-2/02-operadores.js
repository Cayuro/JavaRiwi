/*
Evalúa si dos números son positivos.
*/
let n1, n2, positive;
n1 = parseInt(prompt("primer numero"));
n2 = parseInt(prompt("Segundo número"));

if (n1 >= 0 && n2 >=0) {
    alert(`Los numeros que ingresaste ${n1} y ${n2} son positivos`);
    positive = true;
} else if(n1>=0){
     alert(`solamente el primer numero: ${n1} es positivo`);
} else if (n2>=0) {
    alert(`solamente el segundo numero: ${n2} es positivo`);
} else {
    alert(`Los numeros que ingresaste ${n1} y ${n2} son negativos, no pasa la prueba`);
}
if (positive) {
    document.write("Eres un crack acabas de ingresar numeros positivos y puedes sumarlos  " + (n1+n2))
}