const express = require("express");
const router  = express.Router();

const mainController =require("../controllers/adminController");

/* enlistar todas las rutas con la entrada y controlador 
(con "atributo") respectivo */

router.get("/adminPanel", mainController.admin);

//Crear un producto nuevo:
router.get("/agregarProducto", mainController.agregar);
router.post("/agregarProductoNuevo",mainController.agregarProducto);




router.get("/listaProductos", mainController.lista);
router.get("/editarProductos/:id", mainController.editar);


module.exports = router; 

/* Creamos un router y lo exportamos */