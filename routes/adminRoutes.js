const express = require("express");
const router  = express.Router();

const mainController =require("../controllers/adminController");

/* enlistar todas las rutas con la entrada y controlador 
(con "atributo") respectivo */

router.get("/adminPanel", mainController.admin);


module.exports = router; 

/* Creamos un router y lo exportamos */