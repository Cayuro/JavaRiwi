const taskInput = document.getElementById("taskInput");
const btnAddTask = document.getElementById("btnAddTask");
const taskManager = document.getElementById("divTask");


// const aquí estamos clonando el primer elemento hijo de taskmanager
const divTask = document.getElementById('divTask');
const divCheck = divTask.target.closest('.size-5');

divCheck.addEventListener('click', ()=>{
    divCheck.classList.add('lococrazy');
    divCheck.removeAttribute('class')
})

btnAddTask.addEventListener('click',()=>{
    if (taskInput.value.trim() == ""){
        taskInput.setAttribute('placeholder','Ingrese algo válido mi hermanazo');
        taskInput.style.backgroundColor = 'rgba(252, 16, 16, 0.35)';
        taskInput.classList.add('placeholder:text-white')
        return;
    }
    const taskDuplicated = taskManager.lastElementChild;
    const taskTemplate = taskDuplicated.cloneNode(true);
    const taskAdd = taskTemplate.cloneNode(true);
    const taskText = taskAdd.querySelector('span');
    taskText.textContent = taskInput.value;
    taskManager.prepend(taskAdd);
    taskManager.target.closest()('.group/item').remove();
     // 2. Resetear estilos del input si eran rojos
    taskInput.style.backgroundColor = '';
    taskInput.setAttribute('placeholder', 'Add a new task...');
    taskInput.value = "";
})



// const taskInput = document.getElementById("taskInput");
// const btnAddTask = document.getElementById("btnAddTask");
// const taskManager = document.getElementById("divTask");

// btnAddTask.addEventListener('click', () => {
//     // 1. Validación
//     if (taskInput.value.trim() === "") {
//         taskInput.setAttribute('placeholder', 'Ingrese algo válido mi hermanazo');
//         taskInput.style.backgroundColor = 'rgba(252, 16, 16, 0.35)';
//         taskInput.classList.add('placeholder:text-white');
//         return;
//     }

//     // 2. Resetear estilos del input si eran rojos
//     taskInput.style.backgroundColor = '';
//     taskInput.setAttribute('placeholder', 'Add a new task...');

//     // 3. Clonación (Buscamos el molde dentro del evento)
//     const taskTemplate = taskManager.firstElementChild;
//     const newTask = taskTemplate.cloneNode(true);
    
//     // 4. Personalizar el clon
//     const taskText = newTask.querySelector('span');
//     taskText.textContent = taskInput.value;
    
//     // IMPORTANTE: Limpiar el estado visual por si el molde estaba completado
//     const checkCircle = newTask.querySelector('.size-5');
//     checkCircle.innerHTML = ''; // Quitamos el icono de check si lo tiene
//     checkCircle.classList.remove('bg-primary', 'border-primary');
//     taskText.classList.remove('line-through', 'text-gray-400');

//     // 5. Agregar a la lista
//     taskManager.prepend(newTask);
//     taskInput.value = "";
// });

// // --- DELEGACIÓN DE EVENTOS ---
// // En lugar de darle clic a un círculo, le damos clic al CONTENEDOR (taskManager)
// // y él nos dice a qué elemento hijo se le hizo clic.
// taskManager.addEventListener('click', (event) => {
//     // Si el usuario hizo clic en el circulito del check
//     if (event.target.classList.contains('size-5')) {
//         const circle = event.target;
//         const text = circle.nextElementSibling; // El span que está al lado

//         // Alternar clases (Toggle) para marcar como completado
//         circle.classList.toggle('bg-primary');
//         circle.classList.toggle('border-primary');
//         text.classList.toggle('line-through');
//         text.classList.toggle('text-gray-400');
        
//         // Poner o quitar el icono de check
//         circle.innerHTML = circle.classList.contains('bg-primary') 
//             ? '<span class="material-symbols-outlined text-white text-[16px]">check</span>' 
//             : '';
//     }

//     // Si el usuario hizo clic en el botón de borrar (basura)
//     if (event.target.closest('button')) {
//         const btn = event.target.closest('button');
//         // Verificamos si es el botón de borrar (el que tiene la clase hover:text-red-500)
//         if (btn.classList.contains('hover:text-red-500') || btn.innerHTML.includes('delete')) {
//             btn.closest('.group\\/item').remove();
//         }
//     }
// });