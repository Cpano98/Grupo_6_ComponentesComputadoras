const express = require("express");
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');

const productController =require("../controllers/productController");

//implementación de multer para imagenes ***
/* 
const storage = multer.diskStorage({
    destination:(req,flie,cb)=>{
        cb(null, path.join(__dirname))
    }
})
*/

//Recordemos tienen el prefijo /products al buscarse aquí***
/*-- admin  */
router.get("/admin", productController.admin);

/* --- Get products --- */
router.get("/", productController.lista);

/* --- Get detalle ---*/
router.get("/productDetail/:id/", productController.product);

/* --- Get/post crear producto --- */
router.get("/create", productController.agregar);
router.post("/", productController.agregarProducto);

/* --- Get/put editar producto --- */
router.get('/edit/:id', productController.editar);
router.put('/edit/:id', productController.actualizar);

/* --- Delete borrar producto --- */

//El carrito de compras va aquí??
router.get("/productCart", productController.cart);

module.exports = router; 
