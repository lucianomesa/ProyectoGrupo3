function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

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
function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function showAlertEmailError() {
    document.getElementById("alert-email-danger").classList.add("show");
}


let btn = document.getElementById('boton-iniciar-sesion');

let email = document.getElementById('email');
let pw = document.getElementById('password');

btn.addEventListener('click', function(e) {

    e.preventDefault();

    const datos = {
        email: email.value,
        password: pw.value
    };

    localStorage.datos = JSON.stringify(datos);

    sessionStorage.datos = JSON.stringify(datos);

    let expReg= /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

    if(expReg.test(email.value) && email.value && pw.value) {
        showAlertSuccess();
        location.href = "index.html";    
    } else if (email.value && pw.value) {
        showAlertEmailError();
    } else {
        showAlertError();
    }
});