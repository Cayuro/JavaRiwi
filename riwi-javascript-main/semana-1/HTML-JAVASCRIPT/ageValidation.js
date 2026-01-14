const inputAge = document.getElementById("inputAge");
const buttonEligibility = document.getElementById("buttonEligibility");
const divEligibility = document.getElementById("divElegibility");

buttonEligibility.addEventListener('click', ()=> {
    
    if ((inputAge.value >= 18) && (inputAge.value < 80)){
        alert("¡Congrats! You are elegibility")
        divEligibility.classList.remove("hidden")
    }
    else if ((inputAge.value < 18) && (inputAge.value >= 0)){
        alert("Sorry, you are minor, is not posibble to select you");
        divEligibility.classList.add("hidden")
    }
    else {
        alert("Prompt a real age, or a age less than 80")
        divEligibility.classList.add("hidden")
    }
    inputAge.value = "";
});

inputAge.addEventListener('input', ()=>{
    if ((inputAge.value >= 18) && (inputAge.value < 80)){
        inputAge.style.backgroundColor = "#0f05";
    }
    else if ((inputAge.value < 18) && (inputAge.value >= 0)){
        inputAge.style.backgroundColor = "#7776";
    } 
    else {
        inputAge.style.backgroundColor = "#f005";
    }
})