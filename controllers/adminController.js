const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/baseProductosPre.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    admin: (req, res) => {
        return res.render("./admin/adminPanel.ejs");
    },
    agregar: (req, res) => {
        return res.render("./admin/agregarProducto.ejs");
    },
    lista: (req, res) => {
        return res.render("./admin/listaProductoscCRUD.ejs", { products });
    },
    editar: (req, res) => {
        const id = req.params.id
        const productoEnviar = products.find(p => p.id == id)
        return res.render("./admin/editarProducto.ejs", { products:productoEnviar });
    }


}

module.exports = controller