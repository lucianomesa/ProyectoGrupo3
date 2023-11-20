
const email = document.getElementById("email");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const lastName = document.getElementById("lastName");
const lastName2 = document.getElementById("lastName2");
const cel = document.getElementById("cel");
const btn = document.getElementById("btn");
const data = JSON.parse(localStorage.getItem("datos"));
const datos2 = JSON.parse(localStorage.getItem("datos2"));
const imagen = JSON.parse(localStorage.getItem("imagenData"));
const profileImg = document.getElementById('profileImg');
const imgInput = document.getElementById('img');
const img = document.getElementById("user");


//Funcion de boostrap para validar formularios
(function () {
  "use strict";
  let forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();



//Condicion para saber si el usuario ingreso una imagen 
if(imagen){
  img.src = imagen;
}

//Condicion para saber si el usuario ingreso sus datos anteriormente
if (datos2) {
  name1.value = datos2.name1;
  name2.value = datos2.name2;
  lastName.value = datos2.lastName;
  lastName2.value = datos2.lastName2;
  cel.value = datos2.cel;
  }


if (data) {
  email.value = data.email;
}

//Evento click para cargar lo datos que ingrese el usuario en el localStorage
btn.addEventListener("click", function () {
  const datos2 = {
    name1: name1.value,
    name2: name2.value,
    lastName: lastName.value,
    lastName2: lastName2.value,
    cel: cel.value,
  };
  data.email = email.value;
  localStorage.setItem("datos", JSON.stringify(data));
  localStorage.setItem("datos2", JSON.stringify(datos2));
  if (name1.value && lastName.value && email.value) {
    location.reload();
    }
  
});



//Evento input para cargar la imagen subida por el usuario y mostrarla en pantalla
imgInput.addEventListener('input', function() {
  let reader = new FileReader();
    reader.onload = function(event) {
        let imageUrl = event.target.result;
        img.src = imageUrl;
        localStorage.setItem('imagenData', JSON.stringify(imageUrl));
    };
    reader.readAsDataURL(imgInput.files[0]);
});

