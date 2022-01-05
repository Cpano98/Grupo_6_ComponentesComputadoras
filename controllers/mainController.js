const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/baseProductosPre.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req, res) => {
        //console.log(id)
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
    }
}

module.exports = controller