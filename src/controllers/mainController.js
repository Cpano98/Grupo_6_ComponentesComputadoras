
// Sequelize requirements
const db = require('../database/models');
const Products = db.Product;
const Users = db.User;

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
	},
	adminPanel: (req, res) => {
    return res.render("adminPanel.ejs");
  },
  adminListProducts: (req, res) => {
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
      .then((users) => {
        return res.render("userCRUDlist.ejs", { users });
      })
      .catch((err) => {
        return res.render("error404", { status: 404, url: req.url });
      });
  },

}

module.exports = mainController