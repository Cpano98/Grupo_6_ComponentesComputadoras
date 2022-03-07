const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");

const productController = require("../controllers/productController");
const guestMiddle = require("../middlewares/guestMiddle");
const adminMiddle = require("../middlewares/adminMiddle");

//implementación de multer para imagenes 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/productosPrueba"));
  },
  filename: (req, file, cb) => {
    /* modificar para incluir la hora si funciona? */
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//Validaciones del registro de productos
const validationProduct = [
  body("name")
    .notEmpty()
    .withMessage("Ingrese un nombre")
    .bail()
    .isLength({ max: 30 })
    .withMessage("Máximo 30 caracteres")
    .bail(),
  body("brand")
    .notEmpty()
    .withMessage("Debe elgir una marca")
    .bail()
    .custom((value, { req }) => {
      if (value == "value1") {
        throw new Error("OPCION DEFUALT TEST*");
      }
      return true;
    })
    .bail(),
  body("description")
    .notEmpty()
    .withMessage("Ingrese una descripción")
    .bail()
    .isLength({ max: 2000 })
    .withMessage("Máximo 2000 caracteres")
    .bail()
    .isLength({ min: 20 })
    .withMessage("Mínimo 20 caracteres")
    .bail(),
  body("price").notEmpty().withMessage("Ingrese un precio").bail(),
  body("pieces")
    .notEmpty()
    .withMessage("Ingrese la cantidad")
    .bail()
    .isInt({ min: 0, max: 10000 })
    .withMessage("acotado entre 0 y 10000")
    .bail(),
  body("image")
    .custom((value, { req }) => {
      let file = req.file;
      if (!file) {
        throw new Error("'Debes' subir una imagen");
      }
      return true;
    })
    .bail(),
  body("category")
    .notEmpty()
    .withMessage("Debe elgir una categoria")
    .bail()
    .custom((value, { req }) => {
      if (value == "value1") {
        throw new Error("OPCION DEFUALT TEST*");
      }
      return true;
    })
    .bail(),
  body("sku")
    .notEmpty()
    .withMessage("Ingrese un sku")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Al menos 5 caracteres")
    .bail(),
  body("discount")
    .isInt({ min: 0, max: 1000 })
    .withMessage("acotado entre 0 y 1000")
    .bail(),
];

/*-- admin  */
router.get("/admin", productController.adminPanel);
router.get("/admin/list", productController.adminList);
router.get("/admin/listUsers", productController.adminListUsers);




/* --- Get products --- */
router.get("/", productController.list);
router.get("/:category", productController.listCategory);

/* --- Get detalle ---*/
router.get("/productDetail/:id/", productController.productDetail);

/* --- Get/post crear producto --- */
router.get("/create/new", productController.productAdd);

router.post(
  "/create/new",
  upload.single("image"),
  validationProduct,
  productController.productAddUp
);

/* --- Get/put editar producto --- */
router.get("/edit/:id", adminMiddle, productController.productEdit);
router.put(
  "/edit/:id",
  upload.single("image"),
  validationProduct,
  productController.productEditUp
);

/* --- Delete borrar producto --- */
router.delete("/delete/:id", productController.productDelete);
router.get("/delete/confirmation", productController.deleteConfirm);

/* --- BÚSQUEDA DE PRODUCTOS --- */
router.post("/search", productController.search);

module.exports = router;
