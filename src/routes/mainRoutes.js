const express = require("express");
const router  = express.Router();

const mainController =require("../controllers/mainController");

/* enlistar todas las rutas con la entrada y controlador 
(con "atributo") respectivo */

router.get("/", mainController.index);
router.get("/index", mainController.index);
router.get("/home", mainController.index);


module.exports = router; 

/* Creamos un router y lo exportamos */