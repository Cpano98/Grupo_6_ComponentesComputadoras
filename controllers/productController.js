const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/baseProductosPre.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    product: (req, res) => {
        const id = req.params.id
        const productoEnviar = products.find(p => p.id == id)
        //console.log(id)

        return res.render("productDetail.ejs", { item:productoEnviar });
    },
    cart: (req, res) => { 
        return res.render("productCart.ejs");
    }
}

module.exports = controller