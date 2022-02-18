const fs = require('fs');
const path = require('path');
const {validationResult} = require("express-validator")

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

			console.log(conOferta[0].image);
			//console.log(sinOferta);

			return res.render('todosLosProductos.ejs', { conOferta, sinOferta })
		})
			.catch(err => {
				res.send(err)
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
		Products.findByPk(req.params.id)
			.then(product => {
				res.render("productDetail.ejs", { item: product });
			})
			.catch(err => {
				res.render('error404', { status: 404, url: req.url });
			})
	},

	/* Contenido de admin a product */

	admin: (req, res) => {
		res.render("adminPanel.ejs");
	},
	adminLista: (req, res) => {
		Products.findAll()
			.then(products => {
				console.log(products[0].image);
				res.render('listaProductosCRUD.ejs', { products });
			})
			.catch(err => {
				res.render('error404', { status: 404, url: req.url });
			})
	},
	agregar: (req, res) => {
		res.render("agregarProducto.ejs");
	},

	/* - - - - - - - - AGREGAR PRODUCTO - - - - - - - - - */
	agregarProducto: (req, res, next) => {
        /* VALIDADOR de formulario de agregarProducto */
        const resultVal = validationResult(req);
        if (!resultVal.isEmpty()){
            return res.render('agregarProducto.ejs', {
                errors:resultVal.mapped(),
                old:req.body,
                oldFile:req.file })
        }
        
		const file = req.file
		if (!file) {
			const error = new Error('No ha seleccionado un archivo')
			error.httpStatusCode = 404;
			return res.render('error404.ejs')
			//return next(error)
		}
		

		console.log("Valores form " + req.body);
        console.log('Info del file'+ file.originalname)
		//res.send("Info recibida")

		Products.create({
			name: req.body.name,
			sku: req.body.sku,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			//image: file.originalname,
			category: req.body.category,
			brand: req.body.brand,
			pieces: req.body.pieces
		}).then(products => {
			//console.log(products);
			res.redirect("admin/lista-productos")
		})


	},

	/* - - - - - - - - EDITAR PRODUCTO - - - - - - - - - */
	editar: (req, res) => {
		/*
		const id = req.params.id
		const item = products.find(p => p.id == id)
		return res.render("editarProducto.ejs", { item });
		*/
		// Sequelize Implementation

		/*
		Products.findByPK(req.params.id)
		.then(product => {
			res.render("editarProducto.ejs", { item:product });
		})
		.catch(err => {
			res.render('error404', { status: 404, url: req.url });
		})
		*/
        
		Products.findByPk(req.params.id)
			.then(products => {
				//console.log(products.name);
				//console.log(products.id);
				//console.log(products.discount);
				res.render('editarProducto.ejs', { item: products });
			})
			.catch(err => {
				res.render('error404', { status: 404, url: req.url });
			})

	},

	/* - - - - - - - - ACTUALIZAR PRODUCTO - - - - - - - - - */
	actualizar: (req, res, next) => {
		/* VALIDADOR de formulario de actualizarProducto
        const resultVal = validationResult(req);
        if (!resultVal.isEmpty()){
            return res.render('profileEdit.ejs', {
                errors:resultVal.mapped(),
                old:req.body })
        }
        */
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
        

		console.log("Editando producto: " + req.params.id);
        
		console.log(req.body);
        console.log('Info del file'+ file.originalname)
		
        /*
		Products.findByPk(req.params.id)
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
			*/
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
            where: {id: req.params.id}
        }).then(
            res.render("productoActualizado.ejs")
        );

			
			
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