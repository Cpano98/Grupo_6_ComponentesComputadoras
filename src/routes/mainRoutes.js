const express = require("express");
const router  = express.Router();


const mainController =require("../controllers/mainController");



router.get("/", mainController.index);
router.get("/index", mainController.index);
router.get("/home", mainController.index);
/*-- admin  */
router.get("/admin", mainController.adminPanel);
router.get("/admin/listProducts", mainController.adminListProducts);
router.get("/admin/listUsers", mainController.adminListUsers);



module.exports = router; 

/* Creamos un router y lo exportamos */