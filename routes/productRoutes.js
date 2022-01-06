const express = require("express");
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');


const productController =require("../controllers/productController");

/* implementar multer aquí :D */

//Recordemos tienen el prefijo /products al buscarse aquí***
/* --- Get products --- */
router.get("/",productController.lista);

router.get("/productDetail/:id/", productController.product);
router.get("/productCart", productController.cart);

module.exports = router; 
