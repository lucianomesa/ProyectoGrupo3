const express = require("express");
const app = express();
const port = 3000;

let cart = require("./api/cart/buy.json");
let cats = require("./api/cats/cat.json");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Bienvenidas al servidor</h1>");
  });

app.get("/cart", (req, res)=> {
    res.json(cart);
});

app.get("/cats", (req, res)=>{
    res.json(cats);
});

app.get("/cats/:id", (req, res) => {
    const id = req.params.id;
    const filteredCat = cats.filter((cat) => {
        return parseInt(cat.id) == parseInt(id);
    });
    res.json(filteredCat);
});

app.get("/cats_products/:index", (req, res)=> {
    const index = req.params.index;
    res.json(require(`./api/cats_products/${parseInt(index)}.json`));
});

app.get("/cats_products/:index/:id", (req, res)=> {
    const index = req.params.index;
    const id = req.params.id;
    const product = require(`./api/cats_products/${parseInt(index)}.json`);
    const filterProducts = product.products.filter((prod)=> {return parseInt(prod.id) === parseInt(id)});
    res.json(filterProducts);
});

app.get("/products/:id", (req, res)=> {
    const id = req.params.id;
    res.json(require(`./api/products/${parseInt(id)}.json`));
});









app.listen(port, () => {
    console.log(`Server is running in port http://localhost:${port}`);
});

