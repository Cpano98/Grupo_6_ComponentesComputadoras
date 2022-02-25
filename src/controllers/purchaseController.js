// Sequelize Requirements
const db = require('../database/models');
const sequelize = db.sequelize;

const Products = db.Product;

const Ticket_Products = db.Ticket_Product;

const purchaseController = {
	/* - - - - - - - - CART - - - - - - - - - */
	cart: (req, res) => {
		return res.render('cart.ejs')
	},
	
	/* - - - - - - - - ADD TO CART - - - - - - - - - */
	addToCart: (req, res) => {
		Ticket_Products.create({
			id_ticket: req.body,	
			id_product: req.body,
			qty_product: req.body
		})
	}
}

module.exports = purchaseController