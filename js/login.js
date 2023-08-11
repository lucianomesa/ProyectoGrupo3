let boton = document.getElementById("ingBtn");
let checkbox = document.getElementById("terminos");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("password");

boton.addEventListener("click", function(){
if ((usuario.value) && (contraseña.value.length)>=8){
    alert ("Inicio de sesión correcto");
    window.location.href = "index.html";
} else {
    alert ("Inicio de sesión incorrecto");
}
})

