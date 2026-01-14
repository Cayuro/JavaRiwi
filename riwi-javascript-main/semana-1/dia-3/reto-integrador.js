// /*
// Crea un programa que evalúe una nota y muestre si aprueba o reprueba,
// usando funciones, condicionales y ciclos.
// */



// function matAprovation(nombre,nota){
//     let aprove = false;
//     if(nota >= 3){
//         aprove = true;
//     }
//     console.log(`${nombre} aprove the course: ${aprove}`)
// }

// matAprovation("Juanes",4)

// let  counter= 0;
// console.log(counter);  //  ->  undefined
// {
//          let counter  =  1;
//          console.log(counter);
//          counter += 2; //  ->  1
// }
// counter  =  counter  +  1;
// console.log(counter);  //  ->  2
// {
//     let counter;
//     while(counter <10){
//         counter = counter + 1
//     }
// }
// console.log(counter)

// // const contenedor = document.querySelector("body");
// // const h1DOM = document.createElement("H1");

// // let contador = 10;

// // h1DOM.textContent= contador;
// // contenedor.appendChild(h1DOM);

// // for (let i = 10; i > 0; i--) {

// //     setTimeout(() => {
// //         contador--;
// //         h1DOM.textContent = contador;
// //         if (contador==0) {
// //         contenedor.style.backgroundColor= "red";
// //         h1DOM.style.color= "white";
// //     }
// //     }, i*500);
    
// // }

// const contenedor = document.querySelector("body");
// const h1DOM = document.createElement("H1");
// contenedor.appendChild(h1DOM);

// const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// async function iniciarCuentaRegresiva() {
//     let contador = 10;
    
//     // Usamos un bucle que decrementa hasta 0
//     for (let i = contador; i >= 0; i--) {
//         // 1. Actualizamos el texto primero
//         h1DOM.textContent = i;

//         // 2. Si llegamos a 0, cambiamos el color y terminamos
//         if (i === 0) {
//             contenedor.style.backgroundColor = "red";
//             h1DOM.style.color= "white";
//             h1DOM.style.justifySelf= "center";
//             h1DOM.style.margin= "200px";
//             break; // Salimos del bucle
//         }

//         // 3. ESPERAMOS un segundo antes de volver a empezar el bucle
//         await esperar(500);
//     }
// }

// iniciarCuentaRegresiva();

function crearSaludador(saludo) {
  // Esta variable 'saludo' vive en el scope externo
  return function(nombre) {
    console.log(saludo + ", " + nombre);
  };
}

const saludarHola = crearSaludador("Hola");
const saludarChao = crearSaludador("Adiós");
const cualquiera = crearSaludador("Madre de dios purisima");

saludarHola("Elena"); // "Hola, Elena"
saludarChao("Carlos"); // "Adiós, Carlos"
cualquiera("Juanes");
saludarHola("camilo");
saludarChao("Andrea");
cualquiera("Es un día muy feliz")


let x = 10;
let z = x++;
const PI = 3.14;
console.log(PI)

 let str = "JavaScript"
 console.log(str.slice(0,4))
 console.log(str)

// OBJETOS - CRUD (CREA,LEE,MODIFICA,ELIMINA) Y DESTRUCTURING
// const personaje = {
//     nombre: 'goku',
//     raza: 'saiyajin',
//     edad: 35,
//     poder: 9999
// }
// console.log(personaje)
// const nombre = personaje.nombre;
// const edad = personaje.edad;

// const {raza, poder} = personaje;

// console.log(`Hola soy ${nombre}, un guerrero ${raza}, con un poder de: ${poder}`);

// delete personaje.edad;

// console.log(personaje)

// -----------  OBJETO  --------------
//DESTRUCTURING OBJETO DENTRO DE OBJETO
const personaje = {
    nombre: 'goku',
    raza: 'saiyajin',
    edad: 35,
    poder: 9999,
    info: {
        planeta: 'Tierra',
        serie: 'Dragon ball',
        coordenadas: {
            latitud: 12.3456,
            longitud: 45.6789
        }
    }
}
// PARA PROTEGER: Object.freeze(personaje), hace el objeto inmutable
// lo que quiere decir que impide: añadir, eliminar o modificar sus propiedades.
// Object.seal(personaje) impide: añadir y eliminar, pero permite modificar.

// EJEMPLO DESTRUCTURING OJETO DENTRO DE OBJETO 
const {nombre, raza, poder,info: {planeta , serie, coordenadas: { latitud, longitud}}} = personaje;

console.log(`Hola soy ${nombre}, un guerrero ${raza}, con un poder de: ${poder}
    Vengo del planeta ${planeta}, ubicada en una latitud de ${latitud} y longitud de ${longitud}
    puedes verme cuando quieras en ${serie}`);

// -----------  FIN OBJETO  --------------
// UNIR OBJETOS
const personajesSecundarios = {
    picolo: {
        nombre: 'picolo',
        raza: 'namecuzein',
        edad: 80,
        poder: 4000,  
    },
    vegeta: {
        nombre: 'Vegueta',
        raza: 'saiyajin',
        edad: 80,
        poder: 9000,  
    },
    gohan: {
        nombre: 'Gohan',
        raza: 'saiyajin',
        edad: 80,
        poder: 4000,  
    }
}
Object.assign(personaje, personajesSecundarios);
console.log(personaje)

// PARA PROTEGER: Object.freeze(personaje), hace el objeto inmutable
// lo que quiere decir que impide: añadir, eliminar o modificar sus propiedades.
// Object.seal(personaje) impide: añadir y eliminar, pero permite modificar.

Object.seal(personaje); // si dejamos esto comentado podrán eliminarse gohan y edad
delete personaje.edad;
console.log(personaje)
Object.freeze(personaje); // mod, eli, add después de esto no la toma.
personaje.edad = 30;
delete personaje.edad;
delete personaje.gohan;

// KEYS - VALUES - ENTRIES dependiendo lo que queramos del objeto.

perro = "perro"
console.log(perro.charAt(2))
console.table(personaje)
console.table(Object.keys(personaje))

const numeros = [ 
    [1,2,3,4,5],
    [6,7,8,9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25]
]

function imprimirEspiral(matriz) {
    let filaInicio = 0;
    let filaFin = matriz.length - 1;
    let colInicio = 0;
    let colFin = matriz[0].length - 1;

    while (filaInicio <= filaFin && colInicio <= colFin) {
        // → recorrer fila superior
        for (let j = colInicio; j <= colFin; j++) {
            console.log(matriz[filaInicio][j]);
        }
        filaInicio++;

        // ↓ recorrer columna derecha
        for (let i = filaInicio; i <= filaFin; i++) {
            console.log(matriz[i][colFin]);
        }
        colFin--;

        // ← recorrer fila inferior (si queda)
        if (filaInicio <= filaFin) {
            for (let j = colFin; j >= colInicio; j--) {
                console.log(matriz[filaFin][j]);
            }
            filaFin--;
        }

        // ↑ recorrer columna izquierda (si queda)
        if (colInicio <= colFin) {
            for (let i = filaFin; i >= filaInicio; i--) {
                console.log(matriz[i][colInicio]);
            }
            colInicio++;
        }
    }
}

imprimirEspiral(numeros);
numeros.forEach(e=>{
    console.log(`Fila: ${e}`)
})
// FILTER CON UN REDUCE PARA SABER EL PROMEDIO AL DIVIDIRLO ENTRE E.LENGTH
const result = numeros.filter(e=>
    (e.reduce((a,b)=>a+b) / e.length) >= 50
)
console.log(result)
// MAP 
const multiplicaArray = numeros.map(el=>{el.forEach(e=>{
    return el[e]*2
})
    
})
console.log(multiplicaArray)

const numeritos = [3,4,5,2,1]
const ordenados = [...numeritos] // TOCA DECIRLE QUE HEREDE SPREAD
ordenados.sort() // PARA CUANDO SE HACE ESTE SORT FUNCIONE BIEN
console.log(numeritos + ordenados)
if(numeritos === ordenados){
    console.log("Está ordenado de forma ascendente")
} else{
    console.log("NO está ordenado de forma ascendente")
}
// ------------------------------------
// CALLBACKS - funciones que se pasan por parametro a otras funciones

//ejmp CALLBACK en una function ANONIMA
const datos = function(callback){
    callback()

    console.log({
        nombre: 'juan',
        apellido: 'gomez'
    })
}
// al tener un callback le estoy diciendo que primero voy a llamar una función
const saludar = () => {
    console.log('hola mundo')
}
const despedirse = () =>{
    console.log('Adiós popo')
}

datos(saludar)
datos(despedirse)

// PASARLO DIRECTO
datos(()=>console.log('Soy un Callback'))

// ------------------------------------
//FUNCIÓN CALCULAR EDAD

function calcularEdad(año,mes,dia){
    const nacimiento = new Date();
    nacimiento.setYear(año);
    nacimiento.setMonth(mes-1);
    nacimiento.setDate(dia);
    const fechaActual = new Date();
    console.log(`tu fecha de nacimiento es ${nacimiento} y Tienes ${Math.floor(((fechaActual - nacimiento)/ 86400000) / 365)} años
    para ser más exactos llevas: 
    días en la tierra: ${Math.floor((fechaActual - nacimiento)/ 86400000)}
    meses totales: ${Math.floor(((fechaActual - nacimiento)/ 86400000)/ 30.425)}`)
    
}
const nacimiento = new Date();

calcularEdad(2000,8,18);

function nombreDiaSemana(año,mes,dia){
    const diaSemana = new Date(año,mes-1,dia);
    const diasDeSemana = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    console.log(diasDeSemana[diaSemana.getDay()])
    
    const numerico = Math.floor(diaSemana-1 / 86400000) //DIAS TOTALES
    const numeroDia = numerico % 7
    console.log(diasDeSemana[numeroDia])

    if (numeroDia == 5){
        console.log('Friday')
    } else if(numeroDia == 4){
        console.log('Thursday')
    } else if(numeroDia == 3){
        console.log('Wednesday')
    } else if(numeroDia == 2){
        console.log('Tursday')
    } else if(numeroDia == 1){
        console.log('Monday')
    } else if(numeroDia == 6){
        console.log('Tuesday')
    } else {
        console.log('Sunday')
    }
}

//TRES SOLUCIONES PARA EL MISMO PROBLEMA
nombreDiaSemana(2000,8,18);
nombreDiaSemana(2002,1,30);
nombreDiaSemana(2002,1,31);
nombreDiaSemana(2010,1,8);

function diaHastaCumpleanos(YYYY,MM,DD){
    const diaSemana = new Date(YYYY,MM-1,DD);
    const numeroDias = diaSemana/ (216*24*1000)
    console.log(numeroDias)  
}
diaHastaCumpleanos(2000,8,18);
diaHastaCumpleanos(2002,1,30);
diaHastaCumpleanos(2002,1,31);
diaHastaCumpleanos(2010,1,8);

const dateTime = new Date(2000,8,18)
console.log(dateTime.getDate())
console.log(dateTime.getMonth())
console.log(dateTime.getFullYear())
const fecha = new Date("2024-11-14T10:30:00");

console.log(fecha.getHours());

$.ajax({
  url: 'https://randomuser.me/api/',
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});
      

