const toggle = document.getElementById("buttonToggle");
const tarjeta = document.getElementById("tarjeta");
const tarjeta2 = document.getElementById("tarjeta2");
const h3 = document.getElementById("h3");


toggle.addEventListener('click', () => {
    tarjeta.classList.toggle('dark');
    if (tarjeta2.style.backgroundColor == "rgb(26, 38, 50)"){
        console.log("hola");
        tarjeta2.style.backgroundColor = "white"
        // h3.style.backgroundColor = "white";
        h3.style.color = "black";
        console.log(h3.style.backgroundColor == "gray")
    }
    else {
        // h3.style.backgroundColor = "rgb(26, 38, 50)";
        h3.style.color = "white";
        tarjeta2.style.backgroundColor = "rgb(26, 38, 50)"
    }
})

// TOGGLE PAGE THEME - (DARK/WHITE)
const togglePage = document.getElementById("togglePage");

togglePage.addEventListener("click", ()=>{
    document.body.classList.toggle('dark')
})