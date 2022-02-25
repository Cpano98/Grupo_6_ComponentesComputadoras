// Sequelize Requirements
const db = require('../database/models');
const sequelize = db.sequelize;

const Products = db.Product;

const purchaseController = {
	/* - - - - - - - - CART - - - - - - - - - */
	cart: (req, res) => {
		return res.render('cart.ejs')
	},
	
	/* - - - - - - - - ADD TO CART - - - - - - - - - */
	addToCart: (req, res) => {
		
	}
}

module.exports = purchaseController