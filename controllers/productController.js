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
    
    admin: (req, res) => {
        res.render("adminPanel.ejs");
    },
    agregar: (req, res) => {
        res.render("agregarProducto.ejs");
    },
    agregarProducto: (req, res, next) => {
        /*
        Revisar si el id de productos es dinámico o nel?
        */
        const file = req.file
        if(!file){
            const error = new Error('No ha seleccionado un archivo')
            error.httpStatusCode = 400;
            return res.render('error400.ejs')
            //return next(error)
        }

        const newProduct = {
            id: products[products.length - 1].id + 1,
            ...req.body,
            image: file.originalname
        }

        products.push(newProduct)

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))

        res.redirect("products")
    },


    editar: (req, res) => {
        const id = req.params.id
        const item = products.find(p => p.id == id)
        return res.render("editarProducto.ejs", {item});
    },
    actualizar:(req, res, next)=>{
        const file = req.file
        if(!file){
            const error = new Error('No ha seleccionado un archivo')
            error.httpStatusCode = 400;
            return next(error)
        }

        const id = req.params.id
        const idx = products.findIndex(p => p.id == id);

        
        /* Revisar si sí actualizamos solo imagenes? */
        /*Revisar cambios debidos a ponerle fechas a las imagenes*/
        
        const imagenAUsar = products[idx].image == file.originalname ? products[idx].image:file.originalname

        products[idx] ={
            id,
            ...req.body,
            image: imagenAUsar
        }

        

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
        res.redirect("/products/productDetail/"+id) 
    },

    borrar: (req, res) => {
        const id = req.params.id
        const idx = products.findIndex(p => p.id == id)

        products.splice(idx, 1)

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
        res.redirect("/products")

    },
    //Mover el carrito?
    cart: (req, res) => { 
        return res.render("productCart.ejs");
    }
}

module.exports = controller