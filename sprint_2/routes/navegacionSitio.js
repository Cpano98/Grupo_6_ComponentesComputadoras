let express = require('express');
const path = require("path");
let router = express.Router();
const app = express();


const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));


router.get("", function (req, res) {
    //res.send("Bienvenido");
    res.sendFile(path.join(__dirname, '../views/index.html'));
});


router.get("/register", (req, res) => {
    //res.send("Pagina Registro");
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.get("/login", (req, res) => {
    //res.send("Pagina LOGIN");
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.get("/productCart", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/productCart.html'));
});

router.get("/productDetail", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/productDetail.html'));
});

module.exports = router;