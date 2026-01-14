/*
Imprime números del 1 al 10 usando ciclos.
*/
for (let i = 1; i <= 10; i++) {
    if (i == 4) {
        console.log("%c Numero: " + i, "color:white; background:red;padding:10px 100px;")
    } else {
        console.log("%c Numero: " + i, "color:black; background:white;padding:10px 100px;")
    }
} // aquí imprimimos en consola y les damos estilo y señalamos un número especifico