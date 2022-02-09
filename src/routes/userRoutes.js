const express = require("express");
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const {body} = require('express-validator'); 
const guestMiddle = require("../middlewares/guestMiddle");
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

//Validaciones del registro de usuarios
const validationReg = [
    body('name').notEmpty().withMessage('Ingrese un nombre'),
    body('username').notEmpty().withMessage('Ingrese un nick'),
    body('email').notEmpty().withMessage('Ingrese un correo valido'),
    body('password').notEmpty().withMessage('Ingrese una contraseña'),
    body('passwordVal')
        .notEmpty().withMessage('Ingrese su contraseña nuevamente').bail()
        .custom( 
            (value, {req} ) => {
                if( value !== req.body.password){   
                    throw new Error('Contraseña no coincide');
                }
            return true;
        })

]
//Validaciones de la edición de datos de usuario
const validationEdit = [
    body('name').notEmpty().withMessage('Ingrese un nombre'),
    body('username').notEmpty().withMessage('Ingrese un nick'),
    body('email').notEmpty().withMessage('Ingrese un correo valido'),
    body('password').notEmpty().withMessage('Ingrese una contraseña'),
    body('passwordVal').notEmpty().withMessage('Ingrese su contraseña nuevamente'),
]



router.get("/login", guestMiddle, userController.login);
router.post("/login", userController.logger);

router.get("/register", guestMiddle , userController.register);
router.post("/register", validationReg, userController.registed);

// "profile" es a la que deberían redirigir una vez se tiene un usuario
router.get("/profile", userController.profile );

router.get("/profileEdit", userController.profileEdit);
router.put("/profileEdit", upload.single('image'), validationEdit , userController.profileEditUp); 

//router.get (eliminar usuario, enviar a página de confirmación
//router.delete (eliminar usuario)
//router.post (cerrar sesion) //Loggout??

module.exports = router; 
