const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/baseProductosPre.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    lista: (req, res) => {
        res.render("listaProductoscCRUD.ejs", { products });
    },

    //Detalles de producto

    product: (req, res) => {
        const id = req.params.id
        const productoEnviar = products.find(p => p.id == id)
        //console.log(id)
        
        return res.render("productDetail.ejs", { item:productoEnviar });
    },

    //Mover el carrito?
    cart: (req, res) => { 
        return res.render("productCart.ejs");
    },

    /* Contenido de admin a product */
    admin: (req, res) => {
        return res.render("adminPanel.ejs");
    },
    agregar: (req, res) => {
        return res.render("agregarProducto.ejs");
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

        res.redirect("listaProductos")
    },


    editar: (req, res) => {
        const id = req.params.id
        const productoEnviar = products.find(p => p.id == id)
        return res.render("editarProducto.ejs", { products: productoEnviar });
    },

    borrar: (req, res) => {
        const id = req.params.id
        const idx = products.findIndex(p => p.id == id)

        products.splice(idx, 1)

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
        res.redirect("listaProductos")

    }
}

module.exports = controller