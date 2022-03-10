const fs = require('fs');
const path = require('path');

//const productsFilePath = path.join(__dirname, '../data/products.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Sequelize requirements
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = db.Sequelize.Op;
const Product = require('../database/models/Product');

const Products = db.Product;

const mainController = {
	index: (req, res) => {
		
		// Sequelize Implementation
		const conOferta = [];
		const sinOferta = [];

		Products.findAll()
        .then((products) => {
			products.forEach(p => {
				if (p.discount != "0") {
					conOferta.push(p);
				} else {
					sinOferta.push(p);
				}
			})

			

			return res.render('index.ejs', { conOferta, sinOferta })
		})
    .catch(err => {
        res.send(err)
    })
	}

}

module.exports = mainController