document.addEventListener("DOMContentLoaded", function () {
  const urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
  const products = document.getElementById("cartProduct");

  function agregarTotal(val, arr) {
    const tot = document.getElementById(`total-${arr.id}`);
    tot.innerHTML = `${arr.currency}-${val * arr.unitCost}`;
  }

  function addProducts(arr) {
    const productContainer = document.createElement("div");
    productContainer.classList.add("row", "row-cols-5");
    productContainer.innerHTML = `
      <div class="col"><img src="${arr.image}" class="img-fluid" alt="${arr.name}" width = 60px></div>
      <div class="col">${arr.name}</div>
      <div class="col">${arr.currency} ${arr.unitCost}</div>
      <div class="col"><input type="number" class="form-control w-50 m-auto contador" min="1" max="100" value="1"> <br></div>
      <div class="col" id="total-${arr.id}">${arr.currency}-${arr.unitCost}</div>
    
    `;
    products.appendChild(productContainer);

    const contadorInput = productContainer.querySelector(".contador");
    contadorInput.addEventListener("input", function () {
      agregarTotal(contadorInput.value, arr);
    });
  }

  async function getJsonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    addProducts(data.articles[0]);
    const sessionList = JSON.parse(sessionStorage.getItem("list"));
    if (sessionList && Array.isArray(sessionList)) {
      for (let i = 0; i < sessionList.length; i++) {
        addProducts(sessionList[i]);
      }
    }
  }
  getJsonData(urlCart);
});
