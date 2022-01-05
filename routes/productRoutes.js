const express = require("express");
const router  = express.Router();

const productController =require("../controllers/productController");

/* creo que aquí se cargan los comentarios :'(  */

    
router.get("/productDetail/:id/", productController.product);
router.get("/productCart", productController.cart);

module.exports = router; 
