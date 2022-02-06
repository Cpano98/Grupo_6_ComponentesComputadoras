const express = require("express");
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');

const userController =require("../controllers/userController");

//Implementado de multer para usuario
const storage = multer.diskStorage({
    destination:(req, flie, cb)=>{
        cb( null, path.join(__dirname, '../public/images/users' ) );
    },
    filename:(req, file, cb )=>{
        cb( null, file.originalname );
    }
})
const upload = multer({storage});

router.get("/login", userController.login);
router.post("/login", userController.logger);

router.get("/register", userController.register);
router.post("/register", userController.registed);

// "profile" es a la que deberían redirigir una vez se tiene un usuario
router.get("/profile", userController.profile );

router.get("/profileEdit", userController.profileEdit);
router.put("/profileEdit", upload.single('image'), userController.profileEditUp); 

//router.get (eliminar usuario, enviar a página de confirmación
//router.delete (eliminar usuario)
//router.post (cerrar sesion) //Loggout??

module.exports = router; 
