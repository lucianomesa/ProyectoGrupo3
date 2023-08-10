//Para crear éste código nos basamos en la estructura del archivo "categories.js"
let data_url = "https://japceibal.github.io/emercado-api/cats_products/101.json"
function setCatID(id) {
   localStorage.setItem("catID", id);
   window.location = "product-info.html"
}

function titulo(items){
    let htmlContentToAppend = "";
    htmlContentToAppend += `
        <h2>Productos</h2>
        <p class="lead">Verás aquí todas los productos de categoria <strong>${items.catName}</strong>.</p>
    `;
     document.getElementById("containerTitulo").innerHTML = htmlContentToAppend;
}

function showCategoriesList(items){
    let htmlContentToAppend = "";
    for(const products of items){
            htmlContentToAppend += `
            <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                            <small class="text-muted">${products.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `;
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}
//Primero creamos el fetch y la variable data_url asociada a éste
async function fetchData(){
    const response = await fetch(data_url);
    const data = await response.json();
    showCategoriesList(data.products);
    titulo(data);
}
fetchData();
