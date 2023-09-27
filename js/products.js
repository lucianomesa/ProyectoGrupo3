//URL que contiene los datos
const URL =
  "https://japceibal.github.io/emercado-api/cats_products/" +
  localStorage.getItem("catID") +
  ".json";
const storedData = JSON.parse(localStorage.datos);
const listContainer = document.getElementsByClassName("list-container");
const btnMinMax = document.getElementById("minMax");
const btnMaxMin = document.getElementById("maxMin");
const btnRelevancia = document.getElementById("btnRelevancia");
const buscador = document.getElementById("buscador");
const filtrar = document.getElementById("rangeFilterCount");
const rangeFilterCountMin = document.getElementById("rangeFilterCountMin");
const rangeFilterCountMax = document.getElementById("rangeFilterCountMax");

// Función para mostrar los productos en el contenedor
function showProducts(products) {
  listContainer[0].innerHTML = "";
  showData(products);
}

// Función para ordenar productos por precio ascendente
function sortProductsByPriceAsc(products) {
  return products.sort((a, b) => a.cost - b.cost);
}

// Función para ordenar productos por precio descendente
function sortProductsByPriceDesc(products) {
  return products.sort((a, b) => b.cost - a.cost);
}

// Función para ordenar productos por relevancia
function sortProductsByRelevance(products) {
  return products.sort((a, b) => b.soldCount - a.soldCount);
}

// Función para filtrar productos por nombre o descripcion
function filterProductsByName(products, searchTerm) {
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
  );
}

// Función para filtrar productos por rango de precio
function filterProductsByPriceRange(products, min, max) {
  return products.filter((product) => {
    if (isNaN(min) && isNaN(max)) {
      return product.cost >= 0;
    }
    if (isNaN(min)) {
      return product.cost <= max;
    }
    if (isNaN(max)) {
      return product.cost >= min;
    }
    return product.cost >= min && product.cost <= max;
  });
}

// Función para limpiar los filtros de rango de precio
function clearPriceRangeFilter(data) {
  listContainer[0].innerHTML = "";
  rangeFilterCountMin.value = "";
  rangeFilterCountMax.value = "";
  showData(data);
}

//Funcion que hace el fetch de la url
async function getJsonData(url) {
  const response = await fetch(url);
  const data = await response.json();
  const products = data.products;
  showData(data.products);
  titulo(data);

  btnMinMax.addEventListener("click", function () {
    showProducts(sortProductsByPriceAsc(data.products));
  });

  btnMaxMin.addEventListener("click", function () {
    showProducts(sortProductsByPriceDesc(data.products));
  });

  btnRelevancia.addEventListener("click", function () {
    showProducts(sortProductsByRelevance(data.products));
  });

  buscador.addEventListener("input", function (e) {
    showProducts(
      filterProductsByName(data.products, e.target.value.toLowerCase())
    );
  });

  filtrar.addEventListener("click", function () {
    const min = parseInt(rangeFilterCountMin.value);
    const max = parseInt(rangeFilterCountMax.value);
    console.log(min);
    const filteredProducts = filterProductsByPriceRange(
      data.products,
      min,
      max
    );
    showProducts(sortProductsByPriceAsc(filteredProducts));
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      clearPriceRangeFilter(data.products);
    });
}

getJsonData(URL);

//Funcion para mostrar el nombre en pantalla
function titulo(items) {
  let htmlContentToAppend = "";
  htmlContentToAppend += `
        <h2>Productos</h2>
        <p class="lead">Verás aquí todas los productos de categoria <strong>${items.catName}</strong>.</p>
    `;
  document.getElementById("containerTitulo").innerHTML = htmlContentToAppend;
}

//Funcion que muestra los datos
function showData(dataArray) {
  for (const item of dataArray) {
    listContainer[0].innerHTML += `
        <div  class="list-group-item list-group-item-action cursor-active" onclick = "setProductsId(${item.id})">
                <div class="row">
                    <div class="col-3">
                    <img src="${item.image}" alt="Imagen del modelo ${item.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${item.name} - ${item.currency} ${item.cost}</h4>
                            <small class="text-muted">${item.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${item.description}</p>
                    </div>
                </div>
            </div>
        `;
  }
}
function userNavbar() {
  let usuario = document.getElementById("productsUser");
  usuario.innerHTML +=  `<div class="btn-group">
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
userNavbar();

function setProductsId(id){
     localStorage.setItem("idProd", id);
     window.location = "product-info.html" 
}
