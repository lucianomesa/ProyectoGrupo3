function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
  setTimeout(() => {
    document.getElementById("alert-success").classList.remove("show");
  }, 2000);
}

function showAlertError() {
  document.getElementById("alert-danger").classList.add("show");
  setTimeout(() => {
    document.getElementById("alert-danger").classList.remove("show");
  }, 2000);
}

function showAlertEmailError() {
  document.getElementById("alert-email-danger").classList.add("show");
  setTimeout(() => {
    document.getElementById("alert-email-danger").classList.remove("show");
  }, 2000);
}

let btn = document.getElementById("boton-iniciar-sesion");
let email = document.getElementById("email");
let pw = document.getElementById("password");
const API_LOGIN = "/login";

btn.addEventListener("click", async function (e) {
  e.preventDefault();
  const datos = {
    email: email.value,
    password: pw.value
  };

  localStorage.datos = JSON.stringify(datos);

  let expReg = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  if (expReg.test(email.value) && email.value && pw.value.length > 4) {
    showAlertSuccess();
    setTimeout(() => {
      location.href = "index.html";
    }, 1000);
  } else if (!expReg.test(email.value)) {
    showAlertEmailError();
  } else {
    showAlertError();
  }
  try {
    const data = {
      username: email.value,
      password: pw.value
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(API_LOGIN, fetchOptions);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const responseData = await response.json();
    const token = responseData.token;
    sessionStorage.setItem('access-token', token);
  } catch (error) {
    alert('Datos ingresados incorrectos');
  }
});
