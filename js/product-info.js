function userNavbar() {
    let usuario = document.getElementById("infoUser");
    const storedData = JSON.parse(sessionStorage.datos);
    usuario.innerHTML += `<a class="nav-link" href="index.html">${storedData.email}</a>`;
}
userNavbar();
const urlCom = "https://japceibal.github.io/emercado-api/products_comments/" + localStorage.getItem("idProd") + ".json"
const URL ="https://japceibal.github.io/emercado-api/cats_products/" +
    localStorage.getItem("catID") +
    ".json";
const products = document.getElementById("productInfo");
function productsInfo(item, data) {
    products.innerHTML += `
    <div>
    <h2 class="text-center pt-5">${item.name}</h2>
    <hr />
    <div class="row">   
      <div class="col-md-8">
          
          <div
            class="ecommerce-gallery"
            data-mdb-zoom-effect="true"
            data-mdb-auto-height="true"
          >
            <div class="row py-3 shadow-5">
              <div class="col-12 mb-1">
                <div class="lightbox">
                  <button
              class="text-end btn-block heartbtn"
              id="heartbtn"
              onclick="favorite()"
            >
                  <i class="fas fa-heart" id="heart"></i>
                  </button>
                  <img id="img-lg"
                    src="img/prod${item.id}_1.jpg"
                    alt="Gallery image 1"
                    class="ecommerce-gallery-main-img active w-100"
                  />
                  
                </div>
              </div>
              <div class="col-3 mt-1">
                <img onclick= "cambiarImg(${item.id}, 1)"
                  src="img/prod${item.id}_1.jpg"
                  data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp"
                  alt="Gallery image 1"
                  class="active w-100 "
                />
              </div>
              <div class="col-3 mt-1">
                <img onclick= "cambiarImg(${item.id}, 2)"
                  src="img/prod${item.id}_2.jpg"
                  data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                  alt="Gallery image 2"
                  class="w-100"
                />
              </div>
              <div class="col-3 mt-1">
                <img onclick= "cambiarImg(${item.id}, 3)"
                  src="img/prod${item.id}_3.jpg"
                  data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp"
                  alt="Gallery image 3"
                  class="w-100"
                />
              </div>
              <div class="col-3 mt-1">
                <img onclick= "cambiarImg(${item.id}, 4)"
                  src="img/prod${item.id}_4.jpg"
                  data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/15a.webp"
                  alt="Gallery image 4"
                  class="w-100"
                />
              </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <strong>Precio</strong>
      <p>${item.currency} ${item.cost}</p>
      <strong>Descripcion</strong>
      <p>${item.description}</p>
      <strong>Categoria</strong>
      <p>${data.catName}</p>
      <strong>Cantidad de Vendidos</strong>
      <p>${item.soldCount}</p>
      <button class="btn btn-primary">Comprar<i></i></button>
      <button class="btn btn-dark">
        Agregar <i class="fas fa-shopping-cart"></i>
      </button>
    </div>
  </div>
  <hr />
    `;
}
function cambiarImg(id, num){
document.getElementById("img-lg").src = "img/prod"+ id +"_"+ num + ".jpg"
}
 let estrellasTotales = "";
function estrellas(n) {
 estrellasTotales = "";
  const stars = document.getElementById("stars");
  for (let i = 1; i <= n; i++) {
    estrellasTotales += `<span class="fa fa-star checked"></span>`;
  }
  for (let j = n; j < 5; j++) {
    estrellasTotales+= `<span class="fa fa-star"></span>`;
  }
  return estrellasTotales;
}

const comentBtn = document.getElementById("comentbtn");

comentBtn.addEventListener("click", function(e) {
  e.preventDefault();
  var selectElement = document.getElementById("calificacion");
  var selectedValue = selectElement.value;
  var comentario = document.getElementById("textComent");
  var comentarios = document.getElementById("comText");
  var nombre = document.getElementById("name");

    const fecha = document.getElementById("fecha");
var fechaActual = new Date();
var año = fechaActual.getFullYear();
var mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
var dia = ('0' + fechaActual.getDate()).slice(-2);
var hora = ('0' + fechaActual.getHours()).slice(-2); 
var minuto = ('0' + fechaActual.getMinutes()).slice(-2);
var segundo = ('0' + fechaActual.getSeconds()).slice(-2);
var fechaHoraFormateada = año + '-' + mes + '-' + dia + ' ' + hora + ':' + minuto + ':' + segundo;

  const storedData = JSON.parse(sessionStorage.datos);
  if(selectedValue >=1 && selectedValue <= 5 && comentario.value != ""){
     comentarios.innerHTML += ` <div class="comentado">
<div class="name" ><p ><strong>${storedData.email.split("@")[0]}</strong></p> </div>  
<div class="fecha" class = "text-muted"><small> &nbsp; - ${fechaHoraFormateada} - &nbsp; </small></div>
<div class="stars">${estrellas(selectedValue)} </div>

</div>
<div id="comText">${comentario.value}</div> 
<hr>
`
     comentario.value = "";
     
     fecha();
  }
    else{
      alert("Debes escribir un comentario y poner una puntuacion");
    }
});



function favorite() {
    document.getElementById("heartbtn").classList.toggle("heartbtnok");
}

const idproducto = localStorage.getItem("idProd");
console.log(idproducto);
async function getJsonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    const filtro = data.products.filter((item) => item.id == idproducto);
    console.log(filtro);
    productsInfo(filtro[0], data);
}
getJsonData(URL);
function nuevoCom(comments){
  for(let comment of comments){
     comentarios.innerHTML += ` <div class="comentado">
  <div class="name" ><p ><strong>${comment.user}</strong></p> </div>  
  <div class="fecha" class = "text-muted"><small> &nbsp; - ${comment.dateTime} - &nbsp; </small></div>
  <div class="stars">${estrellas(comment.score)} </div>
  </div>
  <div id="comText">${comment.description}</div> 
  <hr>
  ` 
  }
}
async function cargarComments(url) {
  const response = await fetch(url);
  const data = await response.json();
  nuevoCom(data)
}
cargarComments(urlCom);
