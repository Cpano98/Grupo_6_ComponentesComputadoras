const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");
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
    .isLength({ min: 5 })
    .withMessage("Al menos 5 caracteres")
    .bail(),
  body("username")
    .notEmpty()
    .withMessage("Ingrese un nick")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Al menos 5 caracteres")
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
    .isLength({ min: 5 })
    .withMessage("Al menos 5 caracteres")
    .bail(),
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
//Validaciones de la edición de datos de usuario
const validationEdit = [
  body("name")
    .notEmpty()
    .withMessage("Ingrese un nombre")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Al menos 5 caracteres")
    .bail(),
  body("username")
    .notEmpty()
    .withMessage("Ingrese un nick")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Al menos 5 caracteres")
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
    .isLength({ min: 5 })
    .withMessage("Al menos 5 caracteres")
    .bail(),
  body("passwordVal")
    .notEmpty()
    .withMessage("Ingrese su contraseña nuevamente")
    .bail(),
];

const validationLog = [
  body("password").notEmpty().withMessage("Debe incluir una contraseña").bail(),
];

router.get("/login", guestMiddle, userController.login);
router.post("/login", validationLog, userController.logger);

router.get("/register", guestMiddle, userController.register);
router.post("/register", validationReg, userController.registed);

// "profile" es a la que deberían redirigir una vez se tiene un usuario
router.get("/profile", adminMiddle, userController.profile);

router.get("/profileEdit", adminMiddle, userController.profileEdit);
router.put(
  "/profileEdit",
  upload.single("image"),
  validationEdit,
  userController.profileEditUp
);

router.get("/logout", adminMiddle, userController.logout);

//router.get (eliminar usuario, enviar a página de confirmación
//router.delete (eliminar usuario)

module.exports = router;
