const controller = {
    product: (req, res) => { 
        return res.render("productDetail.ejs");
    },
    cart: (req, res) => { 
        return res.render("productCart.ejs");
    }
}

module.exports = controller