const express = require('express');
const path = require("path");
const router = express.Router();

const navegacionSitio = require('../controllers/navegacionSitio');

const publicPath = path.join(__dirname, "../public");
router.use(express.static(publicPath));


router.get("/", navegacionSitio.index);

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