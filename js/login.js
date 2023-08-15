function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

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