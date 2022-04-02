const express = require('express');
const router = express.Router();
const userAPIController = require('../../controllers/api/userAPIController');

//Rutas gets
// en el json de la api se devuelve:
router.get('/list', userAPIController.list);
//total de usuarios
//lista de todos los usuarios
//detalle último usuario agregado

router.get('/detail/:id', userAPIController.detail);
//detalle del usuario con id


//router.post('/create', usersAPIController.create);
//router.put('/update/:id', usersAPIController.update);
//router.delete('/delete/:id', usersAPIController.destroy);

module.exports = router;