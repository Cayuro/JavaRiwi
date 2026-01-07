const inputName = document.getElementById("inputName");
const btnGreetMe = document.getElementById("btnGreetMe");
const waitingInput = document.getElementById("waitingInput");

btnGreetMe.addEventListener('click', ()=>{
    if (inputName.value == ""){
        waitingInput.style.background = "#f006";
        waitingInput.textContent = "Waiting for input...";
    }
    else {
        waitingInput.style.background = "#0f06";
        waitingInput.textContent = (`¡Hello! ${inputName.value}`)
    }
})
