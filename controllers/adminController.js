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
        const body = req.body;
        console.log(body + "Producto agregado");
        res.send("Producto agregado con éxito");

        

        /*
        const newProduct = {
            id: products[products.length - 1].id + 1,
            ...req.body,
            image: ""
        }

        products.push(newProduct)
        // express validator
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
        
        res.redirect("/listaProductos")
        */
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