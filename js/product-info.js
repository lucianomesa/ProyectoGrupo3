function userNavbar() {
    let usuario = document.getElementById("infoUser");
    const storedData = JSON.parse(sessionStorage.datos);
    usuario.innerHTML += `<a class="nav-link" href="index.html">${storedData.email}</a>`;
}
userNavbar();
const URL =
    "https://japceibal.github.io/emercado-api/cats_products/" +
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
          <button
            class="btn text-end btn-block heartbtn"
            id="heartbtn"
            onclick="favorite()"
          >
            <i class="fas fa-heart" id="heart"></i>
          </button>
          <div
            class="ecommerce-gallery"
            data-mdb-zoom-effect="true"
            data-mdb-auto-height="true"
          >
            <div class="row py-3 shadow-5">
              <div class="col-12 mb-1">
                <div class="lightbox">
                  <img
                    src="img/prod${item.id}_1.jpg"
                    alt="Gallery image 1"
                    class="ecommerce-gallery-main-img active w-100"
                  />
                </div>
              </div>
              <div class="col-3 mt-1">
                <img
                  src="img/prod${item.id}_2.jpg"
                  data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp"
                  alt="Gallery image 2"
                  class="active w-100 "
                />
              </div>
              <div class="col-3 mt-1">
                <img
                  src="img/prod${item.id}_3.jpg"
                  data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                  alt="Gallery image 3"
                  class="w-100"
                />
              </div>
              <div class="col-3 mt-1">
                <img
                  src="img/prod${item.id}_4.jpg"
                  data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp"
                  alt="Gallery image 4"
                  class="w-100"
                />
              </div>
              <div class="col-3 mt-1">
                <img
                  src="img/prod${item.id}_5.jpg"
                  data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/15a.webp"
                  alt="Gallery image 5"
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

function comentarios(){
   const coment = document.getElementById("comentarios");

   coment.innerHTML +=  `
   <div class="row">
   <div class="col-md-8">
 <strong><h5>Comentarios</h5></strong>
   <div>
     <strong>
       <p>Jhonatan</p>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star"></span>
       <span class="fa fa-star"></span>
     </strong>
     <p>Me gusto el auto</p>
   </div>
   <form></form>
 </div>
   <div/>
   <div/>
  `



}

comentarios();

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
