const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");
const bcryptjs = require("bcryptjs");
const guestMiddle = require("../middlewares/guestMiddle");
const adminMiddle = require("../middlewares/adminMiddle");
const userController = require("../controllers/userController");

//Implementado de multer para usuario
const storage = multer.diskStorage({
  destination: (req, flie, cb) => {
    cb(null, path.join(__dirname, "../public/images/users"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//Validaciones del registro de usuarios
const validationReg = [
  body("name")
    .notEmpty()
    .withMessage("Ingrese un nombre")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Al menos 2 caracteres")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Máximo 15 caracteres")
    .bail(),
  body("username")
    .notEmpty()
    .withMessage("Ingrese un nick")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Al menos 2 caracteres")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Máximo 15 caracteres")
    .bail(),
  body("email")
    .notEmpty()
    .withMessage("Ingrese un correo valido")
    .bail()
    .isEmail()
    .withMessage("Debe ingresar un Email valido")
    .bail(),
  body("password")
    .notEmpty()
    .withMessage("Ingrese una contraseña")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Al menos 8 caracteres")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Máximo 15 caracteres")
    .bail()
    .custom( (value, {req} ) =>{
      let condMayu = RegExp('[A-Z]').test(value) // mayus
      let condMinu = RegExp('[a-z]').test(value) // minus
      let condNumb = RegExp('[0-9]').test(value) // number
      let condSymb = RegExp('[^0-9a-zA-Z *]').test(value) // simbol
      
      if(!condMayu){  throw new Error("Incluir al menos una mayúscula"); }  
      if(!condMinu){  throw new Error("Incluir al menos una minúscula"); }  
      if(!condNumb){  throw new Error("Incluir al menos un número"); }  
      if(!condSymb){  throw new Error("Incluir al menos un símbolo no númerico"); }  

      /*
      RegexFunction = function(ErrorMSG){
        throw new Error(ErrorMSG)
      }
      !RegExp('[A-Z]').test(value) ? RegexFunction("Incluir al menos una mayúscula") : null ;
      */
      return true;
    }),
  body("passwordVal")
    .notEmpty()
    .withMessage("Ingrese su contraseña nuevamente")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Contraseña no coincide");
      }
      return true;
    }),
];

//Validaciones del loggeo del usuario
const validationLog = [
  body("email")
  .notEmpty()
  .withMessage("Debe incluir algún correo")
  .bail()
  .isEmail()
  .withMessage("Debe ingresar un Email valido")
  .bail(),
  body("password")
  .notEmpty()
  .withMessage("Debe incluir una contraseña")
  .bail(),
];

//Validaciones del edición de usuarios
const validationEdit = [
  body("name")
    .notEmpty()
    .withMessage("Ingrese un nombre")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Al menos 2 caracteres")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Máximo 15 caracteres")
    .bail(),
  body("username")
    .notEmpty()
    .withMessage("Ingrese un nick")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Al menos 2 caracteres")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Máximo 15 caracteres")
    .bail(),
  body("email")
    .notEmpty()
    .withMessage("Ingrese un correo valido")
    .bail()
    .isEmail()
    .withMessage("Debe ingresar un Email valido")
    .bail(),
  body("image")
    .custom((value, { req }) => {
      let file = req.file;
      let extensions = [".png", ".jpg", ".webp", ".jpeg", ".gif"]

      if (file){
        let fileExtension = path.extname(file.originalname);
        if( !extensions.includes(fileExtension) ){
          throw new Error("'Formato' de archivo no valido");
        }
      }
      return true;
    })
    .bail(),
    body('passwordNow')
    .if( body('passwordNew').notEmpty() )
    .notEmpty()
    .withMessage('Ingrese su contraseña previa')
    .bail()
    .if( body('passwordNewVal').notEmpty() )
    .notEmpty()
    .withMessage('Ingrese su contraseña previa')
    .bail()
    .if( body('passwordNow').notEmpty() ) //Si él mismo no está vacio
    .custom( (value, {req} ) =>{
      // Validando con session
      if (!bcryptjs.compareSync(req.body.passwordNow,  req.session.userLogged.pass) ){
        throw new Error("Su contraseña actual es incorrecta")
      }
      return true;
    }),
    body('passwordNew')
    .if( body('passwordNew').notEmpty()  ) 
    .notEmpty()
    .withMessage("Ingrese una contraseña")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Al menos 8 caracteres")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Máximo 15 caracteres")
    .bail()
    .custom( (value, {req} ) =>{
      let condMayu = RegExp('[A-Z]').test(value) // mayus
      let condMinu = RegExp('[a-z]').test(value) // minus
      let condNumb = RegExp('[0-9]').test(value) // number
      let condSymb = RegExp('[^0-9a-zA-Z *]').test(value) // simbol
      console.log(condSymb)
      if(!condMayu){  throw new Error("Incluir al menos una mayúscula"); }  
      if(!condMinu){  throw new Error("Incluir al menos una minúscula"); }  
      if(!condNumb){  throw new Error("Incluir al menos un número"); }  
      if(!condSymb){  throw new Error("Incluir al menos un símbolo no númerico"); }  
      return true;
    }),
    body("passwordNewVal")
    .if( body('passwordNew').notEmpty()  ) 
    .notEmpty()
    .withMessage("Ingrese su contraseña nuevamente")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.passwordNew) {
        throw new Error("Contraseña no coincide");
      }
      return true;
    }),

    
    
];

router.get("/login", guestMiddle, userController.login);
router.post("/login", validationLog, userController.logger);

router.get("/register", guestMiddle, userController.register);
router.post("/register", validationReg, userController.registerUp);

// "profile" es a la que deberían redirigir una vez se tiene un usuario
router.get("/profile", adminMiddle, userController.profile);
router.put("/profile", upload.single("image"), validationEdit, userController.profileUp);

//Eliminar Usuario
router.post("/delete/:id", userController.deleteUser);

//Edicion de usuario en CRUD
router.get("/editUserAdmin/:id", userController.editUserAdmin);
router.post("/editUserAdmin/", userController.editUserAdminPost);



router.get("/logout", adminMiddle, userController.logout);



module.exports = router;
