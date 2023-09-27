const darkTheme = () => {
  document.querySelector("html").setAttribute("data-bs-theme", "dark");
  document.querySelector("#dl-icon").setAttribute("class", "bi bi-sun-fill");
  localStorage.setItem("theme", "dark");
}

const lightTheme = () => {
  document.querySelector("html").setAttribute("data-bs-theme", "light");
  document.querySelector("#dl-icon").setAttribute("class", "bi bi-moon-fill");
  localStorage.setItem("theme", "light");
}

const changeTheme = () => {
  document.querySelector("html").getAttribute("data-bs-theme") ===  "light"? darkTheme() : lightTheme();
}

function showAlertWarning() {
  document.getElementById("alert-warning").classList.add("show");
}

function logOut() {
  localStorage.removeItem("datos");
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });

  let usuario = document.getElementById("navbarUser");
  function userNavbar() {
    const storedData = JSON.parse(localStorage.datos);
    usuario.innerHTML += `
    <div class="btn-group">
      <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="profile-menu">
      ${storedData.email.split("@")[0]}
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
        <li onclick="changeTheme()"> <a class="dropdown-item" href = "#">Cambiar a <i class="bi bi-moon-fill" id="dl-icon"></i></a></li>
        <li><hr class="dropdown-divider"></li>
        <li onclick="logOut()"><a href = "#" class="dropdown-item">Cerrar Sesion</a></li>
      </ul>
    </div>
        `;
  }
  if (!localStorage.datos) {
    showAlertWarning();
    setTimeout(() => {
      location.href = "login.html";
    }, 5000);
  } else {
    userNavbar();
  }

  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme === "dark") {
    darkTheme();
  } else {
    lightTheme();
  }
});
