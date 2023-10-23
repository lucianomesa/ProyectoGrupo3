document.addEventListener("DOMContentLoaded", function () {
  const urlCart =
    "https://japceibal.github.io/emercado-api/user_cart/25801.json";
  const products = document.getElementById("cartProduct");
  let sub_total = document.getElementById("subTotal");
  let costSend = document.getElementById("costSend");
  let totalTotal = document.getElementById("totalTotal");
  var radioButtons = document.querySelectorAll(
    'input[name="flexRadioDefault"]'
  );

  function agregarTotal(val, product) {
    const tot = document.getElementById(`total-${product.id}`);
    const newTotal = val * product.unitCost;
    tot.innerHTML = `${product.currency}-${newTotal}`;
    // Actualiza el valor en el Local Storage
    const sessionList = JSON.parse(localStorage.getItem("list"));
    const updatedList = sessionList.map((item) => {
      if (item.id === product.id) {
        item.count = val;
      }
      return item;
    });
    localStorage.setItem("list", JSON.stringify(updatedList));
  }

  function addProducts(product) {
    const productContainer = document.createElement("div");
    productContainer.classList.add("row", "row-cols-6");
    productContainer.innerHTML = `
      <div class="col"><img src="${product.image}" class="img-fluid" alt="${
      product.name
    }" width = 60px></div>
      <div class="col">${product.name}</div>
      <div class="col d-none d-lg-block d-md-block d-xl-block">${
        product.currency
      } ${product.unitCost}</div>
      <div class="col ms-auto"><input type="number" class="form-control form-control-sm m-auto contador" min="1" max="100" value="${
        product.count
      }"> <br></div>
      <div class="col ms-auto" id="total-${product.id}">${product.currency}-${
      product.unitCost * product.count
    }</div>
      <div class="col ms-auto"><button type = "button" class="btn btn-outline-danger btnDelete" id = "delete${
        product.id
      }"><i class="bi bi-trash3-fill"></i></button> </div>
      `;
    const btnDelete = productContainer.querySelector(".btnDelete");
    btnDelete.addEventListener("click", function () {
      const objeto = JSON.parse(localStorage.getItem("list"));

      const productIdAEliminar = product.id;

      const nuevoArreglo = objeto.filter(
        (producto) => producto.id !== productIdAEliminar
      );

      // Actualiza el arreglo filtrado en el almacenamiento local
      localStorage.setItem("list", JSON.stringify(nuevoArreglo));
      productContainer.innerHTML = "";
      sub_total.innerHTML = `USD-${subTotal(
        JSON.parse(localStorage.getItem("list"))
      )}`;
      const selectedShippingCost = parseFloat(
        document.querySelector('input[name="flexRadioDefault"]:checked').value
      );
      costSend.innerHTML = `USD-${
        Math.round(
          selectedShippingCost *
            subTotal(JSON.parse(localStorage.getItem("list"))) *
            100
        ) / 100
      }`;
      totalTotal.innerHTML = `USD-${
        Math.round(
          (subTotal(JSON.parse(localStorage.getItem("list"))) +
            selectedShippingCost *
              subTotal(JSON.parse(localStorage.getItem("list")))) *
            100
        ) / 100
      }`;
      console.log(
        `Producto con id ${productIdAEliminar} eliminado del localStorage.`
      );
      console.log(nuevoArreglo);
    });

    products.appendChild(productContainer);
    const contadorInput = productContainer.querySelector(".contador");
    contadorInput.addEventListener("input", function () {
      agregarTotal(contadorInput.value, product);
      sub_total.innerHTML = `USD-${subTotal(
        JSON.parse(localStorage.getItem("list"))
      )}`;
      // Actualizar costSend y totalTotal
      const selectedShippingCost = parseFloat(
        document.querySelector('input[name="flexRadioDefault"]:checked').value
      );
      costSend.innerHTML = `USD-${
        Math.round(
          selectedShippingCost *
            subTotal(JSON.parse(localStorage.getItem("list"))) *
            100
        ) / 100
      }`;
      totalTotal.innerHTML = `USD-${
        Math.round(
          (subTotal(JSON.parse(localStorage.getItem("list"))) +
            selectedShippingCost *
              subTotal(JSON.parse(localStorage.getItem("list")))) *
            100
        ) / 100
      }`;
    });
    //funcion para envitar que la cantidad de producto sea mayor a 0
    var inputs = document.querySelectorAll("input[type=number]");
    inputs.forEach(function (input) {
      input.addEventListener("keydown", function (e) {
        e.preventDefault();
      });
    });
  }

  async function getJsonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    let listCart = JSON.parse(localStorage.getItem("list")) || [];
    const productIdToAdd = data.articles[0].id;
    const isProductInCart = listCart.some((item) => item.id === productIdToAdd);
    if (!isProductInCart) {
      listCart.push(data.articles[0]);
      localStorage.setItem("list", JSON.stringify(listCart));
    }
    for (let i = 0; i < listCart.length; i++) {
      addProducts(listCart[i]);
    }
  }
  getJsonData(urlCart);

  function subTotal(arr) {
    let cont = 0;
    let unSub = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].currency === "UYU") {
        unSub = (parseInt(arr[i].count) * arr[i].unitCost) / 40;
        cont = cont + unSub;
      } else {
        unSub = parseInt(arr[i].count) * arr[i].unitCost;
        cont = cont + unSub;
      }
    }
    return cont;
  }
  console.log(subTotal(JSON.parse(localStorage.getItem("list"))));

  sub_total.innerHTML = `USD-${
    Math.round(subTotal(JSON.parse(localStorage.getItem("list"))) * 100) / 100
  }`;

  // Obtén todos los elementos de radio con el atributo "name" igual a "flexRadioDefault"

  // Agrega un evento "change" a cada radio button para detectar cambios
  radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("input", function () {
      // Muestra el valor seleccionado en el elemento con id "valorSeleccionado"
      costSend.innerHTML = `USD-${
        Math.round(
          radioButton.value *
            subTotal(JSON.parse(localStorage.getItem("list"))) *
            100
        ) / 100
      }`;
      totalTotal.innerHTML = `USD-${
        Math.round(
          (subTotal(JSON.parse(localStorage.getItem("list"))) +
            radioButton.value *
              subTotal(JSON.parse(localStorage.getItem("list")))) *
            100
        ) / 100
      }`;
    });
  });

  // Obtener referencias a los campos de tarjeta y cuenta bancaria
  const creditCardFields = document.querySelectorAll(
    "#creditCardNumber, #securityCode, #expirationDate"
  );
  const bankTransferFields = document.querySelectorAll("#accountNumber");

  // Agregar eventos de cambio a los botones de radio
  document
    .getElementById("creditCardRadio")
    .addEventListener("input", function () {
      // Si se selecciona "Tarjeta de crédito", habilitar los campos de tarjeta de crédito
      creditCardFields.forEach((field) => (field.disabled = !this.checked));

      // Si se selecciona "Tarjeta de crédito", desactivar los campos de transferencia bancaria
      bankTransferFields.forEach((field) => (field.disabled = this.checked));
    });

  document
    .getElementById("bankTransferRadio")
    .addEventListener("input", function () {
      // Si se selecciona "Transferencia bancaria", habilitar los campos de transferencia bancaria
      bankTransferFields.forEach((field) => (field.disabled = !this.checked));

      // Si se selecciona "Transferencia bancaria", desactivar los campos de tarjeta de crédito
      creditCardFields.forEach((field) => (field.disabled = this.checked));
    });
});

(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");
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

const pago = document.getElementById("pago");
const inputTarjeta = document.getElementById("creditCardRadio");
const inputTraferencia = document.getElementById("bankTransferRadio");
const radio15 = document.getElementById("flexRadioDefault1");
const radio7 = document.getElementById("flexRadioDefault2");
const radio5 = document.getElementById("flexRadioDefault3");

inputTarjeta.addEventListener("input", function () {
  if (inputTarjeta.checked) {
    pago.innerHTML = `Tarjeta de Credito  `;
    alertPago.innerHTML = "";
  }
});

inputTraferencia.addEventListener("input", function () {
  if (inputTraferencia.checked) {
    pago.innerHTML = `Tranferencia Bancaria  `;
    alertPago.innerHTML = "";
  }
});

const btnTotal = document.getElementById("btnTotal");
const creditCardNumber = document.getElementById("creditCardNumber");
const securityCode = document.getElementById("securityCode");
const expirationDate = document.getElementById("expirationDate");
const alertPago = document.getElementById("alertPago");
const accountNumber = document.getElementById("accountNumber");
const noSend = document.getElementById("noSend");

btnTotal.addEventListener("click", function () {
  const listaDeProductos = JSON.parse(localStorage.getItem("list"));

  
  if (!listaDeProductos || listaDeProductos.length === 0) {
    alert("El carrito está vacío");}
  
    // Verificar las condiciones relacionadas con el método de pago y el tipo de envío
    if (
      (inputTarjeta.checked &&
       (!creditCardNumber.value ||
        !securityCode.value ||
        !expirationDate.value)) ||
      (inputTraferencia.checked && !accountNumber.value)
    ) {
      alertPago.innerHTML = `Debe seleccionar un método de pago`;
    } else {
      alertPago.innerHTML = "";
    }
    if (!inputTarjeta.checked && !inputTraferencia.checked) {
      alertPago.innerHTML = `Debe seleccionar un método de pago`;
    }
    if (!radio15.checked && !radio5.checked && !radio7.checked) {
      noSend.innerHTML = `Seleccione un tipo de envío`;
    }
    if (radio15.checked || radio5.checked || radio7.checked) {
      noSend.innerHTML = ``;
    } 

    // Comprobar si se cumplen todas las condiciones
    todasLasCondicionesCumplidas =
      listaDeProductos.length > 0 && (radio15.checked || radio5.checked || radio7.checked) && (inputTarjeta.checked &&
        creditCardNumber.value &&
        securityCode.value &&
        expirationDate.value) ||
      (inputTraferencia.checked && accountNumber.value)
    
  
  
  // Finalmente, mostrar la última alerta si se cumplen todas las condiciones
  if (todasLasCondicionesCumplidas) {
    alert("Su compra fue exitosa!");
  }
  
});
