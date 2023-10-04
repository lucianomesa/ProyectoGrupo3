document.addEventListener("DOMContentLoaded", function() {
  const urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
  const products = document.getElementById("cartProduct");

  function agregarTotal(val, arr){
    const tot = document.getElementById("total");
    tot.innerHTML = `${arr.currency}-${val * arr.unitCost}`;
  }
  function addProducts(arr) {
    products.innerHTML += `
      <div class="col"><img src="${arr.image}" width="65px"></div>
      <div class="col">${arr.name}</div>
      <div class="col">${arr.currency} ${arr.unitCost}</div>
      <div class="col"><input type="number" id="contador" min="1" max="100" value = "1"></div>
      <div class="col" id="total">${arr.currency}-${arr.unitCost}</div>
    `;
    
    let values = document.getElementById("contador");
    values.addEventListener("input", function() {
      agregarTotal(values.value, arr);
    });
  }

  async function getJsonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    addProducts(data.articles[0]);
  }

  getJsonData(urlCart);
});
