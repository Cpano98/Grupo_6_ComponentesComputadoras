const express = require('express');
const router = express.Router();
const productAPIController = require('../../controllers/api/productAPIController');

//Rutas gets

// en el json de la api se devuelve:
router.get('/list', productAPIController.list);
//lista de todos los productos
//dos listas de productos, con descuento y sin descuento.
//detalle último producto agregado
//total de productos

router.get('/detail/:id', productAPIController.detail);
//detalle de producto

router.get('/categories', productAPIController.categories);
//total de categorias,
//categorias y totales de cada una,



//router.post('/create', productsAPIController.create);
//router.put('/update/:id', productsAPIController.update);
//router.delete('/delete/:id', productsAPIController.destroy);

module.exports = router;