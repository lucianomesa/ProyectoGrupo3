let boton = document.getElementById("ingBtn");
let checkbox = document.getElementById("terminos");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("password");
let parra = document.getElementById('parra');

boton.addEventListener("click", function(){
if ((usuario.value) && (contraseña.value.length)>=8){
    alert ("Inicio de sesión correcto");
    window.location.href = "index.html";
    verificar;
} else {
    alert ("Inicio de sesión incorrecto");
    parra.innerHTML = "Verifique los datos contraseña o usuario incorrectos"
    verificar = false
}
})

