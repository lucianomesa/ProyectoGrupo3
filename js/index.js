
document.addEventListener("DOMContentLoaded", function(){
    const loggedInUser = localStorage.getItem("loggedInUser"); //Toma el valor del login

    if (!loggedInUser) { //verifica si fue logeado
      window.location.href = "login.html"; // Redirigir al usuario a la página de inicio de sesión
    }
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
});