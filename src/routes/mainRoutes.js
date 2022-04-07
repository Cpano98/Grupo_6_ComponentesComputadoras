const express = require("express");
const router  = express.Router();


const mainController =require("../controllers/mainController");

const guestMiddle = require("../middlewares/guestMiddle");
const adminMiddle = require("../middlewares/adminMiddle");


router.get("/", mainController.index);
router.get("/index", mainController.index);
router.get("/home", mainController.index);
/*-- admin  */
router.get("/admin", adminMiddle, mainController.adminPanel);
router.get("/admin/listProducts", adminMiddle, mainController.adminListProducts);
router.get("/admin/listUsers", adminMiddle, mainController.adminListUsers);



module.exports = router; 

/* Creamos un router y lo exportamos */