const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Sequelize requirements
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const Products = db.Product;

const controller = {
    index: (req, res) => {
				/*
        //Ofertas
        const ofertas = [];
        const sinOferta = [];

        products.forEach(p => {
            if (p.descuento != "0") {
                ofertas.push(p);
            } else {
                sinOferta.push(p);
            }
        })

        return res.render("index.ejs", { products, ofertas, sinOferta });
				*/

			//Ofertas
			const conOferta = [];
			const sinOferta = [];
			Products.findAll()
				.then(products => {
					products.forEach(item => {
						item.discount > 0 ? conOferta.push(item) : sinOferta.push(item)
					})
				})
				.then(() => {
					return res.render('index.js', {conOferta: conOferta, sinOferta: sinOferta})
				})
				.catch(err => {
					res.json({err: err.message})
				})

    }
}

module.exports = controller