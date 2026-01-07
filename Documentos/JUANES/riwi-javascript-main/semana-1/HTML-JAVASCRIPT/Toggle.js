const toggle = document.getElementById("buttonToggle");
const tarjeta = document.getElementById("tarjeta");
const tarjeta2 = document.getElementById("tarjeta2");
const h3 = document.getElementById("h3");

toggle.addEventListener('click', () => {
    tarjeta.classList.toggle('dark');
    if (h3.style.backgroundColor == "black"){
        console.log("hola");
        tarjeta2.style.backgroundColor = "white"
        h3.style.backgroundColor = "white";
        h3.style.color = "black";
        console.log(h3.style.backgroundColor == "black")
    }
    else {
        h3.style.backgroundColor = "black";
        h3.style.color = "white";
        tarjeta2.style.backgroundColor = "black"
    }
})

