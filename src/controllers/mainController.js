const fs = require('fs');
const path = require('path');

//const productsFilePath = path.join(__dirname, '../data/products.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Sequelize requirements
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op }= db.Sequelize.Op;
const Product = require('../database/models/Product');

const Products = db.Product;

const controller = {
    index: (req, res) => {
			// Sequelize Implementation
			
			const conOferta = [];
			const sinOferta = [];
			Products.findAll()
			/*
				.then(products => {
					products.forEach(item => {
						item.discount > 0 ? conOferta.push(item) : sinOferta.push(item)
					})
				})
				*/

				.then((products) => {
					//return res.send(products)
					return res.render('index.ejs', {conOferta: products, sinOferta: products})
				})
				.catch(err => {
					res.send(err)
				})
			// */
    }
}

module.exports = controller