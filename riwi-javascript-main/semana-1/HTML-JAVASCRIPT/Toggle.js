const toggle = document.getElementById("buttonToggle");
const tarjeta = document.getElementById("tarjeta");
const tarjeta2 = document.getElementById("tarjeta2");
const h3 = document.getElementById("h3");
const pageTitle = document.getElementById("pageTitle");

toggle.addEventListener('click', () => {
    // tarjeta.classList.toggle('dark');
    if (tarjeta2.style.backgroundColor == "rgb(26, 38, 50)"){
        tarjeta2.style.backgroundColor = "white";
        // h3.style.backgroundColor = "white";
        h3.style.color = "black";
         tarjeta.classList.toggle('dark');
    }
    else {
        // h3.style.backgroundColor = "rgb(26, 38, 50)";
        h3.style.color = "white";
        tarjeta2.style.backgroundColor = "rgb(26, 38, 50)";
         tarjeta.classList.toggle('dark');
    }
})

// TOGGLE PAGE THEME - (DARK/WHITE)
const togglePage = document.getElementById("togglePage");

togglePage.addEventListener("click", ()=>{
    document.body.classList.toggle('dark');
    pageTitle.style.color= "black";
})