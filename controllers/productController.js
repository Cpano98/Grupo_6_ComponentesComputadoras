const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    //Listado de productos
    lista: (req, res) => {
        res.render("listaProductoscCRUD.ejs", { products });
    },
    //Detalles de producto
    product: (req, res) => {
        //renombre productoEnviar por "item"
        const id = req.params.id
        const item = products.find(p => p.id == id)
        //console.log(id)
        res.render("productDetail.ejs", {item});
    },

    /* Contenido de admin a product */
    // Admin se usará para?
    admin: (req, res) => {
        res.render("adminPanel.ejs");
    },
    agregar: (req, res) => {
        res.render("agregarProducto.ejs");
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

        res.redirect("products")
    },


    editar: (req, res) => {
        const id = req.params.id
        const item = products.find(p => p.id == id)
        return res.render("editarProducto.ejs", {item});
    },
    actualizar:(req,res)=>{
        const id = req.params.id
        const idx = products.findIndex(p => p.id == id);

        console.log(req.body)
        
        products[idx] ={
            id,
            ...req.body,
            image:""
        }
        

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
        res.redirect("/products/productDetail/"+id) 
    },

    borrar: (req, res) => {
        const id = req.params.id
        const idx = products.findIndex(p => p.id == id)

        products.splice(idx, 1)

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
        res.redirect("listaProductos")

    },
    //Mover el carrito?
    cart: (req, res) => { 
        return res.render("productCart.ejs");
    }
}

module.exports = controller