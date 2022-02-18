const express = require("express");
const router  = express.Router();


const mainController =require("../controllers/mainController");



router.get("/", mainController.index);
router.get("/index", mainController.index);
router.get("/home", mainController.index);


module.exports = router; 

/* Creamos un router y lo exportamos */