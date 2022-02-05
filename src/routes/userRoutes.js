const express = require("express");
const router  = express.Router();

const userController =require("../controllers/userController");

router.get("/login", userController.login);
router.post("/login", userController.logger);

router.get("/register", userController.register);
router.post("/register", userController.registed);

// "profile" es a la que deberían redirigir una vez se tiene un usuario
router.get("/profile", userController.profile );

//router.get (editar usuario, editables)
//router.put (editar usuario, enviar edición)
//router.get (eliminar usuario, enviar a página de confirmación
//router.delete (eliminar usuario)
//router.post (cerrar sesion) //Loggout??

module.exports = router; 
