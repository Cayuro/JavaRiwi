// COUNTER
const buttonRemoveCounter = document.getElementById("btnRemoveCt");
const buttonResetCounter = document.getElementById("btnResetCt");
const buttonAddCounter = document.getElementById("btnAddCt");
const simpleCounter = document.getElementById("simpleCounter");

// // CÓMO LO HICE YO
// buttonAddCounter.addEventListener("click", ()=>{
//     let int = parseInt(simpleCounter.textContent)
//     int++;
//     simpleCounter.textContent= int;
// }
// );
// buttonRemoveCounter.addEventListener("click", ()=>{
//     let int = parseInt(simpleCounter.textContent)
//     int--;
//     simpleCounter.textContent= int;
// }
// );
// buttonResetCounter.addEventListener("click", ()=>{
//     simpleCounter.textContent= 0;
// }
// );

// CÓMO LO HIZO MI COMPA
function buttonCounter(element,func){
    element.addEventListener('click', ()=> {
    switch(func){
        case "add":
            ++simpleCounter.innerHTML;
            break
        case "remove":
            --simpleCounter.innerHTML;
            break
        case "reset":
            simpleCounter.innerHTML=0;
            break
    }
})
}
buttonCounter(buttonRemoveCounter,"remove");
buttonCounter(buttonAddCounter,"add");
buttonCounter(buttonResetCounter,"reset");

