//URL que contiene los datos
const URL =
  "https://japceibal.github.io/emercado-api/cats_products/" +
  localStorage.getItem("catID") +
  ".json";
const storedData = JSON.parse(sessionStorage.datos);
//Variable creada para contener el div 'list-container'
const listContainer = document.getElementsByClassName("list-container");

let btnMinMax = document.getElementById("minMax");
let btnMaxMin = document.getElementById("maxMin");
let btnRelevancia = document.getElementById("btnRelevancia");
let buscador = document.getElementById("buscador");
//Funcion que hace el fetch de la url
async function getJsonData(url) {
  const response = await fetch(url);
  const data = await response.json();
  showData(data.products);
  titulo(data)
  btnMinMax.addEventListener("click", function () {
    listContainer[0].innerHTML = "";
    data.products.sort((a, b) => a.cost - b.cost);
    showData(data.products);
  });
  btnMaxMin.addEventListener("click", function () {
    listContainer[0].innerHTML = "";
    data.products.sort((aa, bb) => bb.cost - aa.cost);
    showData(data.products);
  });
  btnRelevancia.addEventListener("click", function () {
    listContainer[0].innerHTML = "";
    data.products.sort((aaa, bbb) => bbb.soldCount - aaa.soldCount);
    showData(data.products);
  });
  buscador.addEventListener("input", function (e) {
    listContainer[0].innerHTML = "";
    let terminoBusqueda = e.target.value.toLowerCase();
    let productosFiltrados = data.products.filter((producto) => {
      return producto.name.toLowerCase().includes(terminoBusqueda);
    });
    showData(productosFiltrados);
  });
}
getJsonData(URL);

//Funcion para el nombre 
function titulo(items){
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
        <div  class="list-group-item list-group-item-action cursor-active">
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
  usuario.innerHTML += `<a class="nav-link" href="index.html">${storedData.email}</a>`;
}
userNavbar();
