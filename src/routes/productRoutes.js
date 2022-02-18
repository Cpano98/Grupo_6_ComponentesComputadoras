const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const productController = require("../controllers/productController");
const guestMiddle = require("../middlewares/guestMiddle");
const adminMiddle = require("../middlewares/adminMiddle");

//implementación de multer para imagenes ***

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/productosPrueba'));
    },
    filename: (req, file, cb) => {
        /* modificar para incluir la hora si funciona? */
        cb(null, file.originalname);
    }
})
const upload = multer({ storage });

//Validaciones del registro de productos
const validationProduct = [
    body('sku').notEmpty().withMessage('Ingrese un nombre').bail()
]


/*-- admin  */
//router.get("/admin",adminMiddle , productController.admin);   ----LO QUITE POR EL MOMENTO PARA EDITAR RAPIDO. CP
router.get("/admin", productController.admin);
router.get("/admin/lista-productos", productController.adminLista);


/* --- Get products --- */
router.get("/", productController.lista);

/* --- Eliminación --- */
router.get("/eliminado", productController.confirmacionEliminado);

/* --- Get detalle ---*/
router.get("/productDetail/:id/", productController.product);

/* --- Get/post crear producto --- */
//router.get("/create",adminMiddle , productController.agregar);----LO QUITE POR EL MOMENTO PARA EDITAR RAPIDO. CP
router.get("/create", productController.agregar);
//router.post("/create", upload.single('image'), productController.agregarProducto);
router.post("/create", upload.single('image'), productController.agregarProducto);



/* --- Get/put editar producto --- */
//router.get('/edit/:id', adminMiddle, productController.editar);----LO QUITE POR EL MOMENTO PARA EDITAR RAPIDO. CP
router.get('/edit/:id', productController.editar);
//router.put('/edit/:id', upload.single('image'), productController.actualizar);----LO QUITE POR EL MOMENTO PARA EDITAR RAPIDO. CP
router.put('/edit/:id', upload.single('image'), productController.actualizar);

/* --- Delete borrar producto --- */
router.delete('/delete/:id', productController.borrar);

//El carrito de compras va aquí??
router.get("/productCart", productController.cart);


module.exports = router; 
