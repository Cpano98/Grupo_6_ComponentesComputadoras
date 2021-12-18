const express = require("express");
const router  = express.Router();

const mainController =require("../controllers/adminController");

/* enlistar todas las rutas con la entrada y controlador 
(con "atributo") respectivo */

router.get("/adminPanel", mainController.admin);
router.get("/agregarProducto", mainController.agregar);
router.get("/listaProductos", mainController.lista);
router.get("/editarProductos", mainController.editar);


module.exports = router; 

/* Creamos un router y lo exportamos */