// const inputTaskManager = document.getElementById("taskInput");
// const btnTask = document.getElementById("btnAddTask");
// const divTask = document.getElementById("divTask");


// const templateTask = divTask.firstElementChild;

// //----------------------------------------------------

// function addNewTask(text){
//     /** @type {HTMLDivElement} */
//     const newTask = templateTask.cloneNode(true)

//     const btnDelete = newTask.querySelector("button");


//     btnDelete.addEventListener("click",()=>{
//         newTask.remove()
//     })
    
//     const textoTask = newTask.querySelector(".text-sm ")
//     textoTask.textContent = text


//     divTask.appendChild(newTask)
// }

//  //-------------------------------

//  btnTask.addEventListener("click", ()=>{
//     if (inputTaskManager.value.trim() == ""){
//         inputTaskManager.value = ""
//         return}
//     addNewTask(inputTaskManager.value)
//     inputTaskManager.value = ""
//  })

const personas = {
    nombre: "calvito",
    edad: 12,
    info: {
        valor: 12000,
        tipo: "persona",
        locura:{
            quieto: "brother"
        }
    }
}

// const nombre = personas.nombre;
// const valor = personas.info.valor;
// const quieto = personas.info.locura.quieto;

let {nombre, info:{valor, locura:{quieto}}} = personas
nombre = "Care loco inmundo"
// valor = negativo
console.log(nombre, valor, quieto)