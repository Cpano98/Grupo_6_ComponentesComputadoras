const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

// Sequelize requirements
const db = require("../database/models");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const Products = db.Product;
const Users = db.User;

const productController = {
  /* - - - - - - - - LISTA PRODUCTO - - - - - - - - - */
  list: (req, res) => {
    const conOferta = [];
    const sinOferta = [];

    Products.findAll()
      .then((products) => {
        products.forEach((p) => {
          if (p.discount != "0") {
            conOferta.push(p);
          } else {
            sinOferta.push(p);
          }
        });

        return res.render("products/todosLosProductos.ejs", { conOferta, sinOferta });
      })
      .catch((err) => {
        res.send(err);
      });
  },

  listCategory: (req, res) => {
    const conOferta = [];
    const sinOferta = [];

    const busqueda = req.params.category;
    console.log("Buscando: " + busqueda)

    Products.findAll({
      where: {
        [Op.or]: [
          {
            category: busqueda,
          },
          {
            brand: busqueda,
          },
          
        ],
      },
      order: [["price", "DESC"]],
    })
      .then((products) => {
        products.forEach((p) => {
          if (p.discount != "0") {
            conOferta.push(p);
          } else {
            sinOferta.push(p);
          }
        });

        return res.render("products/productCategory.ejs", { conOferta, sinOferta, busqueda });
      })
      .catch((err) => {
        res.send(err);
      });
  },

  /* - - - - - - - - DETALLES PRODUCTO - - - - - - - - - */
  productDetail: (req, res) => {
    // Sequelize Implementation
    Products.findByPk(req.params.id)
      .then((product) => {
        return res.render("productDetail.ejs", { item: product });
      })
      .catch((err) => {
        return res.render("error404", { status: 404, url: req.url });
      });
  },
  /* Contenido de admin a product */
  adminPanel: (req, res) => {
    return res.render("adminPanel.ejs");
  },
  adminList: (req, res) => {
    Products.findAll()
      .then((products) => {
        console.log(products[0].image);
        return res.render("listaProductosCRUD.ejs", { products });
      })
      .catch((err) => {
        return res.render("error404", { status: 404, url: req.url });
      });
  },
  adminListUsers: (req, res) => {
    Users.findAll()
      .then((products) => {
        return res.render("users/userCRUDlist.ejs", { products });
      })
      .catch((err) => {
        return res.render("error404", { status: 404, url: req.url });
      });
  },
  /* - - - - - - - - ADD PRODUCT - - - - - - - - - */
  productAdd: (req, res) => {
    return res.render("productAdd.ejs");
  },
  productAddUp: (req, res, next) => {
    // Validate the add product form
    const resultVal = validationResult(req);
    console.log(resultVal.isEmpty())
    if (!resultVal.isEmpty()) {
      return res.render("productAdd.ejs", {
        errors: resultVal.mapped(),
        old: req.body,
        oldFile: req.file,
      });
    }
    const file = req.file;
    if (!file) {
      const error = new Error("No ha seleccionado un archivo");
      error.httpStatusCode = 404;
      return res.render("error404.ejs");
    }
   

    Products.create({
      name: req.body.name,
      sku: req.body.sku,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      image: file.originalname,
      category: req.body.category,
      brand: req.body.brand,
      pieces: req.body.pieces,
    }).then((product) => { 
      return res.render("productDetail.ejs", { item: product.dataValues });
    });
    //FALTA CATCH DE CUANDO OCURREN ERRORES EN EL SQL

  },
  /* - - - - - - - - EDITAR PRODUCTO - - - - - - - - - */
  productEdit: (req, res) => {
    Products.findByPk(req.params.id)
      .then((products) => {
        return res.render("editarProducto.ejs", { item: products });
      })
      .catch((err) => {
        return res.render("error404", { status: 404, url: req.url });
      });
  },
  productEditUp: (req, res, next) => {
    /* VALIDADOR de formulario de actualizarProducto */
    
		const resultVal = validationResult(req);
		if (!resultVal.isEmpty()){
			let product =  Products.findByPk(req.params.id)
			res.render('editarProducto.ejs', 
				{ 
					item: product,
					errors:resultVal.mapped(),
					old:req.body 
				});
		}
		    
    const file = req.file;
    console.log(file)
    if (!file) {
      const error = new Error("No hta seleccionado un archivo");
      error.httpStatusCode = 400;
      return res.render("error40X.ejs");
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
        pieces: req.body.pieces,
      },
      {
        where: { id: req.params.id },
      }).then( () => {
        Products.findByPk(req.params.id)
        .then((products) => {
          console.log(Products)
          console.log('editado')
          return res.render("productDetail.ejs", { item: products });
        })

        
      });
    
  },
  /* - - - - - - - - BORRAR PRODUCTO - - - - - - - - - */
  productDelete: (req, res) => {
    Products.destroy({
      where: { id: req.params.id },
    })
      .then(() => {
        res.redirect("/products/delete/confirmation");
      })
      .catch((err) => {
        res.render("error404", { status: 404, url: req.url });
      });
  },
  deleteConfirm: (req, res) => {
    return res.render("productoEliminado.ejs");
  },
  //*
  //Mover el carrito?
  cart: (req, res) => {
    return res.render("productCart.ejs");
  },
  // */
  search: (req, res) => {
    let palabraBusqueda = req.body.search;
    console.log("Se buscó: " + palabraBusqueda);

    Products.findAll({
      where: {
        [Op.or]: [
          {
            brand: palabraBusqueda,
          },
          {
            price: {
              [Op.like]: palabraBusqueda,
            },
          },
          {
            name: {
              [Op.like]: "%" + palabraBusqueda + "%",
            },
          },
          {
            discount: {
              [Op.like]: palabraBusqueda,
            },
          },
          {
            pieces: {
              [Op.like]: palabraBusqueda,
            },
          },
        ],
      },
      order: [["price", "DESC"]],
    })
      .then((products) => {
        return res.render("resultadosDeBusqueda.ejs", {
          busqueda: palabraBusqueda,
          products,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.render("error404", { status: 404, url: req.url });
      });
  },
};

module.exports = productController;
