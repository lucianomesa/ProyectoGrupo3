let boton = document.getElementById("ingBtn");
let checkbox = document.getElementById("terminos");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("password");
let parra = document.getElementById("alertas");

boton.addEventListener("click", function() {
  if (usuario.value && contraseña.value.length >= 6) {
    parra.innerHTML += `
      <div class="alert alert-success" role="alert">
        <p>Datos guardados correctamente</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    const loggedInUser = usuario.value; // Asignar el valor del usuario a loggedInUser
    sessionStorage.setItem("loggedInUser", loggedInUser); //utiliza el almacenamiento local
     //(localStorage) para guardar el nombre de usuario del usuario que ha iniciado sesión
    window.location.href = "index.html"; // Redirigir después de guardar el usuario
  } else {
    parra.innerHTML = `
      <div class="alert alert-danger" role="alert">
        <p>Los datos ingresados no cumplen con los requisitos solicitados</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
  }
});

