const express = require('express');
const router = express.Router();

const purchaseController = require('../controllers/purchaseController');

router.get('/', purchaseController.cart);

module.exports = router