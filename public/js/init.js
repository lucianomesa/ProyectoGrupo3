const CATEGORIES_URL = "http://localhost:3000/cats";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell/";
const PRODUCTS_URL = "http://localhost:3000/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products_comments/";
const CART_INFO_URL = "http://localhost:3000/cart";


document.addEventListener("DOMContentLoaded", function(){
if (!localStorage.datos) {
  setTimeout(() => {
    location.href = "login.html";
  }, 3000);
};
})

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}



// Agrega el menú desplegable a la barra de navegación
const usuario = document.getElementsByClassName("navbarUser");
function userNavbar() {
  const storedData = JSON.parse(localStorage.datos);
  usuario[0].innerHTML +=
  `
  
    <div class="btn-group">
    
      <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="profile-menu">
        ${storedData.email.split("@")[0]}
      </button>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" href="cart.html">Mi Carrito</a>
        </li>
        <li>
          <a class="dropdown-item" href="my-profile.html">Mi Perfil</a>
        </li>
        <li onclick="changeTheme()">
          <a class="dropdown-item" href = "#">
            Cambiar a <i class="bi bi-moon-fill" id="dl-icon"></i>
          </a>
        </li>
        <li><hr class="dropdown-divider"></li>
        <li onclick="logOut()">
          <a href = "#" class="dropdown-item">Cerrar Sesion</a>
        </li>
      </ul>
    </div>
  `;
}

userNavbar();

// Cierra la sesión
function logOut() {
  localStorage.removeItem("datos");
  location.href = "index.html";
}


// Función que cambia a Modo Oscuro
const darkTheme = () => {
  document.querySelector("html").setAttribute("data-bs-theme", "dark");
  document.querySelector("#dl-icon").setAttribute("class", "bi bi-sun-fill");
  localStorage.setItem("theme", "dark");
}


// Función que cambia a Modo Claro
const lightTheme = () => {
  document.querySelector("html").setAttribute("data-bs-theme", "light");
  document.querySelector("#dl-icon").setAttribute("class", "bi bi-moon-fill");
  localStorage.setItem("theme", "light");
}


// Esta función verifica qué tema tenemos actualmente y ejecuta la función necesaria para cambiarlo
const changeTheme = () => {
  document.querySelector("html").getAttribute("data-bs-theme") ===  "light" ? darkTheme() : lightTheme();
}


// Llamamos la función correspondiente al tema que se utilizó por última vez
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  darkTheme();
} else {
  lightTheme();
}