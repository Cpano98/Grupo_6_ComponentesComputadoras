const express = require('express');
const router = express.Router();
const userAPIController = require('../../controllers/api/userAPIController');

//Listado de todos los generos
router.get('/', userAPIController.list);
//Detalle del genero
router.get('/:id', userAPIController.detail);
