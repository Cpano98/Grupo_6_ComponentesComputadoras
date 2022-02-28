const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator")

// Sequelize requirements
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const Products = db.Product;

const productController = {
	/* - - - - - - - - LISTA PRODUCTO - - - - - - - - - */
	lista: (req, res) => {
		const conOferta = [];
		const sinOferta = [];

		Products.findAll().then((products) => {

			products.forEach(p => {
				if (p.discount != "0") {
					conOferta.push(p);
				} else {
					sinOferta.push(p);
				}
			})

			return res.render('todosLosProductos.ejs', { conOferta, sinOferta })
		})
			.catch(err => {
				res.send(err)
			})
	},
	
	confirmacionEliminado: (req, res) => {
		return res.render("productoEliminado.ejs");
	},

	/* - - - - - - - - DETALLES PRODUCTO - - - - - - - - - */
	product: (req, res) => {
		// Sequelize Implementation
		Products.findByPk(req.params.id)
			.then(product => {
				return res.render("productDetail.ejs", { item: product });
			})
			.catch(err => {
				return res.render('error404', { status: 404, url: req.url });
			})
	},

	/* Contenido de admin a product */

	admin: (req, res) => {
		return res.render("adminPanel.ejs");
	},
	adminLista: (req, res) => {
		Products.findAll()
			.then(products => {
				console.log(products[0].image);
				return res.render('listaProductosCRUD.ejs', { products });
			})
			.catch(err => {
				return res.render('error404', { status: 404, url: req.url });
			})
	},
	agregar: (req, res) => {
		return res.render("productAdd.ejs");
	},

	/* - - - - - - - - ADD PRODUCT - - - - - - - - - */
	productAdd: (req, res, next) => {
		// Validate the add product form
		const resultVal = validationResult(req);
		if (!resultVal.isEmpty()) {
			return res.render('productAdd.ejs', {
				errors: resultVal.mapped(),
				old: req.body,
				oldFile: req.file
			})
		}

		const file = req.file
		if (!file) {
			const error = new Error('No ha seleccionado un archivo')
			error.httpStatusCode = 404;
			return res.render('error404.ejs')
		}

		//console.log("Valores form " + req.body);
		//console.log('Info del file' + file.originalname)
		
		Products.create({
			name: req.body.name,
			sku: req.body.sku,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			image: file.originalname,
			category: req.body.category,
			brand: req.body.brand,
			pieces: req.body.pieces
		}).then(products => {
	
			res.redirect("admin/lista-productos")
		})
	},

	/* - - - - - - - - EDITAR PRODUCTO - - - - - - - - - */
	editar: (req, res) => {
		Products.findByPk(req.params.id)
			.then(products => {
				return res.render('editarProducto.ejs', { item: products });
			})
			.catch(err => {
				return res.render('error404', { status: 404, url: req.url });
			})

	},

	/* - - - - - - - - ACTUALIZAR PRODUCTO - - - - - - - - - */
	actualizar: async (req, res, next) => {
		/* VALIDADOR de formulario de actualizarProducto */
		/*
		const resultVal = validationResult(req);
		if (!resultVal.isEmpty()){
			let product = await Products.findByPk(req.params.id)
			//ESTE render entra con la promesa, pese a que no se quiera
			res.render('editarProducto.ejs', 
				{ 
					item: product,
					errors:resultVal.mapped(),
					old:req.body 
				});
		}
		*/

		const file = req.file
		if (!file) {
			const error = new Error('No hta seleccionado un archivo')
			error.httpStatusCode = 400;

			return res.render('error400.ejs')
		}


		Products.update({
			name: req.body.name,
			sku: req.body.sku,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			image: file.originalname,
			category: req.body.category,
			brand: req.body.brand,
			pieces: req.body.pieces
		},
			{
				where: { id: req.params.id }
			});
		return res.render("productoActualizado.ejs")

	},

	/* - - - - - - - - BORRAR PRODUCTO - - - - - - - - - */
	borrar: (req, res) => {

		Products.destroy({
			where: { id: req.params.id }
		})
			.then(() => {
				res.redirect("/products/eliminado")
			})
			.catch(err => {
				res.render('error404', { status: 404, url: req.url });
			})

	},
	//*
	//Mover el carrito?
	cart: (req, res) => {
		return res.render("productCart.ejs");
	},
	// */

	busqueda: (req, res) => {

		let palabraBusqueda = req.body.search
		console.log("Se buscó: " + palabraBusqueda);

		Products.findAll({
			where: {
				[Op.or]: [
					{
						brand: palabraBusqueda
					},
					{
						price: {
							[Op.like]: palabraBusqueda
						}
					},
					{
						name: {
							[Op.like]: '%' + palabraBusqueda + '%'
						}
					},
					{
						discount: {
							[Op.like]: palabraBusqueda
						}
					},
					{
						pieces: {
							[Op.like]: palabraBusqueda
						}
					}
				]
			},
			order: [
				['price', 'DESC'],
			]
		}).then(products => {
			return res.render('resultadosDeBusqueda.ejs', { busqueda: palabraBusqueda, products });
		}).catch(err => {
			console.log(err);
			return res.render('error404', { status: 404, url: req.url });
		})
	}
}

module.exports = productController