const fs = require('fs');
const path = require('path');

//const productsFilePath = path.join(__dirname, '../data/products.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Sequelize requirements
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const Products = db.Product;

const controller = {
	/* - - - - - - - - LISTA PRODUCTO - - - - - - - - - */
	lista: (req, res) => {
		//res.render("listaProductoscCRUD.ejs", { products });
		// Sequelize Implementation
		Products.findAll()
		.then(products => {
			//res.render('listaProductosCRUD.ejs', { products });
			res.send(products)
		})
		.catch(err => {
			res.render('error404', { status: 404, url: req.url });
		})
	},
	confirmacionEliminado: (req, res) => {
		res.render("productoEliminado.ejs");
	},

	/* - - - - - - - - DETALLES PRODUCTO - - - - - - - - - */
	product: (req, res) => {
		/*
		//renombre productoEnviar por "item"
		const id = req.params.id
		const item = products.find(p => p.id == id)
		res.render("productDetail.ejs", { item });
		*/

		// Sequelize Implementation
		Products.findByPK(req.params.id)
		.then(product => {
			res.render("productDetail.ejs", { product });
		})
		.catch(err => {
			res.render('error404', { status: 404, url: req.url });
		})
	},

	/* Contenido de admin a product */

	admin: (req, res) => {
		res.render("adminPanel.ejs");
	},
	agregar: (req, res) => {
		res.render("agregarProducto.ejs");
	},

	/* - - - - - - - - AGREGAR PRODUCTO - - - - - - - - - */
	agregarProducto: (req, res, next) => {
		/*
		Revisar si el id de productos es dinámico o nel?
		*/
		const file = req.file
		if (!file) {
			const error = new Error('No ha seleccionado un archivo')
			error.httpStatusCode = 404;
			return res.render('error404.ejs')
			//return next(error)
		}

		/*
		const newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: file.originalname
		}

		products.push(newProduct)

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
		*/

		Products.create({
			name: req.body.nombre_producto,
			sku: req.body.sku,
			description: req.body.descripcion,
			price: req.body.precio,
			discount: req.body.descuento,
			image: file.originalname,
			category: req.body.categoria,
			brand: req.body.marca,
			pieces: req.body.piezas
		})

		res.redirect("products")
	},

	/* - - - - - - - - EDITAR PRODUCTO - - - - - - - - - */
	editar: (req, res) => {
		/*
		const id = req.params.id
		const item = products.find(p => p.id == id)
		return res.render("editarProducto.ejs", { item });
		*/

		// Sequelize Implementation
		Products.findByPK(req.params.id)
		.then(product => {
			res.render("editarProducto.ejs", { product });
		})
		.catch(err => {
			res.render('error404', { status: 404, url: req.url });
		})
	},

	/* - - - - - - - - ACTUALIZAR PRODUCTO - - - - - - - - - */
	actualizar: (req, res, next) => {
		const file = req.file
		if (!file) {
			const error = new Error('No hta seleccionado un archivo')
			error.httpStatusCode = 400;
			return res.render('error400.ejs')
		}

		/*
		const id = req.params.id
		const idx = products.findIndex(p => p.id == id);


		// Revisar si sí actualizamos solo imagenes?
		// Revisar cambios debidos a ponerle fechas a las imagenes

		const imagenAUsar = products[idx].image == file.originalname ? products[idx].image : file.originalname

		products[idx] = {
			id,
			...req.body,
			image: imagenAUsar
		}



		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
		res.redirect("/products/productDetail/" + id)
		*/

		// Sequelize Implementation
		Products.findByPK(req.params.id)
		.then(product => {
			product.image = product.image == file.originalname ? product.image : file.originalname;
			return product
		})
		.then(product => {
			res.redirect("/products/productDetail/" + product.id)
		})
		.catch(err => {
			res.render('error404', { status: 404, url: req.url });
		})
	},

	/* - - - - - - - - BORRAR PRODUCTO - - - - - - - - - */
	borrar: (req, res) => {
		/*
		const id = req.params.id
		const idx = products.findIndex(p => p.id == id)

		products.splice(idx, 1)

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
		res.redirect("/products/eliminado")
		*/

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
	//Mover el carrito?
	cart: (req, res) => {
		return res.render("productCart.ejs");
	}
}

module.exports = controller