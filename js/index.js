document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    let usuario = document.getElementById("navbarUser");
    if(!sessionStorage.datos) {
        alert('Inicia sesion para continuar');
        location.href = "login.html";
    }
    else{
        const storedData = JSON.parse(sessionStorage.datos);
        usuario.innerHTML += 
        `<a class="nav-link" href="index.html">${storedData.email}</a>`
        ;
    }
});