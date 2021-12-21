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
    agregarProducto: (req, res) => {
        /*
        const body = req.body;
        console.log(body.nombre_producto + "Producto agregado");
        res.send("Producto agregado con éxito");

        */

        const newProduct = {
            id: products[products.length - 1].id + 1,
            ...req.body,
            image: ""
        }

        products.push(newProduct)
        // express validator
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))

        res.redirect("/admin/listaProductos")
    },

    lista: (req, res) => {
        return res.render("./admin/listaProductoscCRUD.ejs", { products });
    },
    editar: (req, res) => {
        const id = req.params.id
        const productoEnviar = products.find(p => p.id == id)
        return res.render("./admin/editarProducto.ejs", { products: productoEnviar });
    },

    borrar: (req, res) => {
        const id = req.params.id
        const idx = products.findIndex(p => p.id == id)

        products.splice(idx, 1)

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
        res.redirect("/admin/listaProductos")

    }
}

module.exports = controller