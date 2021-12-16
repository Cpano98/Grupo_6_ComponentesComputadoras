const express = require("express");
const router  = express.Router();

const mainController =require("../controllers/mainController");

/* enlistar todas las rutas con la entrada y controlador 
(con "atributo") respectivo */

router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/register", mainController.register);
router.get("/productCart", mainController.productCart);
router.get("/productDetail", mainController.productDetail);

module.exports = router; 

/* Creamos un router y lo exportamos */