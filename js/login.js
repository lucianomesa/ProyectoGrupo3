let boton = document.getElementById("ingBtn");
let checkbox = document.getElementById("terminos");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("password");
let parra = document.getElementById("alertas");

boton.addEventListener("click", function(){
if ((usuario.value) && (contraseña.value.length)>=8){
    parra.innerHTML += `
    <div class = "alert alert-success" role = "alert">
    <p>Datos guardados correctamente</p>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    window.location.href = "index.html";
    verificar;
} else {
    parra.innerHTML = `
    <div class = "alert alert-danger" role = "alert">
    <p>Los datos ingresados no cumplen con los requisitos solicitados</p>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}
});

