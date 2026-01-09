const taskInput = document.getElementById("taskInput");
const btnAddTask = document.getElementById("btnAddTask");
const taskManager = document.getElementById("divTask");


// const aquí estamos clonando el primer elemento hijo de taskmanager

const taskDuplicated = taskManager.firstElementChild;
const taskTemplate = taskDuplicated.cloneNode(true);
btnAddTask.addEventListener('click',()=>{
    if (taskInput.value.trim() == ""){
        taskInput.setAttribute('placeholder','Ingrese algo válido mi hermanazo');
        taskInput.style.backgroundColor = 'rgba(252, 16, 16, 0.35)';
        taskInput.classList.add('placeholder:text-white')
        return;
    }
    const taskAdd = taskTemplate.cloneNode(true);
    const taskText = taskAdd.querySelectorAll('span')[1];
    taskText.textContent = taskInput.value;
    taskManager.appendChild(taskAdd);
     // 2. Resetear estilos del input si eran rojos
    taskInput.style.backgroundColor = '';
    taskInput.setAttribute('placeholder', 'Add a new task...');
    taskInput.value = "";
})
const divTask = document.getElementById('divTask');

// const btnDelete = newTask.querySelector("button");


//     btnDelete.addEventListener("click",()=>{
//         newTask.remove()
//     })

divTask.addEventListener('click', (e)=>{
    // divCheck.classList.add('lococrazy');
    
    
   
    const divTaskIndividual = e.target.closest('.gap-3');
    console.log(divTaskIndividual)
    const spanDivTask = divTaskIndividual.querySelectorAll('span')[1];
    console.log(spanDivTask);
    // e.target.closest()
    if(e.target.closest('.size-5')){
        const div = e.target.closest('.size-5');
        div.classList.toggle('bg-primary');
        spanDivTask.classList.remove('text-sm', 'text-gray-400', 'line-through')
        div.classList.add('border-primary','border', 'border-[#f0f2f4]', 'dark:border-gray-700', 'bg-white', 'dark:bg-[#101922]', 'hover:border-primary/50', 'transition-colors', 'group/item')
        if (div.getAttribute('class').includes('bg-primary')){
            spanDivTask.classList.add('text-sm', 'text-gray-400' ,'line-through');
            div.classList.remove('border-primary','border', 'border-[#f0f2f4]', 'dark:border-gray-700', 'bg-white', 'dark:bg-[#101922]', 'hover:border-primary/50', 'transition-colors', 'group/item')
        }
    }
})


