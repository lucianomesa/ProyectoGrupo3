const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const SECRET_KEY = "PASSWORD SUPER HIPER ULTRA RE SECRETA";
const app = express();
const port = 3000;

let cart = require("./api/user_cart/25801.json");
let cats = require("./api/cats/cat.json");

app.use(express.json());
app.use(express.static("public"));

app.post("/login", (req, res) => {
    const {username, password} = req.body;
    if(username === "admin" && password === "1234"){
        const token = jwt.sign({username}, SECRET_KEY);
        res.status(200).json({token});
    }
    else{
        res.status(401).json({ message: "Usuario y/o contraseña incorecta!"})
    }
});

app.use("/cart", (req, res, next) => {
    try{
        const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
        console.log(decoded);
        next();
    }
    catch (error){
        res.status(401).json({ message: "Usuario no autorizado"})
    }

});

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

app.get("/products_comments/:prod", (req, res)=>{
    const prod = req.params.prod;
    res.json(require(`./api/products_comments/${parseInt(prod)}`));
})



app.listen(port, () => {
    console.log(`Server is running in port http://localhost:${port}`);
});

