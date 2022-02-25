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
    body('name')
        .notEmpty().withMessage('Ingrese un nombre').bail()
        .isLength({max:30}).withMessage('Máximo 30 caracteres').bail(),
    body('brand')
        .notEmpty().withMessage('Debe elgir una marca').bail()
        .custom( 
            (value, {req} ) => {
                if( value == "value1"){   
                    throw new Error('OPCION DEFUALT TEST*');
                }
            return true;
        }).bail(),
    body('description')
        .notEmpty().withMessage('Ingrese una descripción').bail()
        .isLength({max:2000}).withMessage('Máximo 200 caracteres').bail(),
    body('price')
        .notEmpty().withMessage('Ingrese un precio').bail(),
    body('piece')
        .notEmpty().withMessage('Ingrese la cantidad').bail()
        .isInt({min:0,max:10000}).withMessage('acotado entre 0 y 10000').bail(),
    body('image')
        .custom( (value, {req})=>{
            let file = req.file
            if(!file){
                throw new Error('Debes subir una imagen');
            }
            return true
        }).bail(),
    body('category')
        .notEmpty().withMessage('Debe elgir una categoria').bail()
        .custom( 
            (value, {req} ) => {
                if( value == "value1"){   
                    throw new Error('OPCION DEFUALT TEST*');
                }
            return true;
        }).bail(),
    body('sku')
        .notEmpty().withMessage('Ingrese un sku').bail()
        .isLength({min:5}).withMessage('Al menos 5 caracteres').bail(),
    body('discount')
        .isInt({min:0,max:1000}).withMessage('acotado entre 0 y 1000').bail()
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
router.post("/create", upload.single('image'), validationProduct, productController.productAdd);


/* --- Get/put editar producto --- */
//router.get('/edit/:id', adminMiddle, productController.editar);----LO QUITE POR EL MOMENTO PARA EDITAR RAPIDO. CP
router.get('/edit/:id', productController.editar);
//router.put('/edit/:id', upload.single('image'), productController.actualizar);----LO QUITE POR EL MOMENTO PARA EDITAR RAPIDO. CP
router.put('/edit/:id', upload.single('image'), validationProduct, productController.actualizar);

/* --- Delete borrar producto --- */
router.delete('/delete/:id', productController.borrar);

//El carrito de compras va aquí??
//router.get("/productCart", productController.cart);

/* --- BÚSQUEDA DE PRODUCTOS --- */
//router.get("/busqueda-producto", productController.busqueda);
router.post("/busqueda-producto", productController.busqueda);


module.exports = router; 
