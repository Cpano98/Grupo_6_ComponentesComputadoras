/*aquí ira el load de una DataBase */

/* El prototipo de controlador es:

const controllerName = {
    acción: (req,res)=>{
        return ---
    }
}

El return con res.render permite envíar variables al ejs
*/

const controller = {
    index: (req, res) => { 
        return res.render("index.ejs");
    },
    login: (req, res) => { 
        return res.render("login.ejs");
    },
    register: (req, res) => { 
        return res.render("register.ejs");
    },
    productCart: (req, res) => { 
        return res.render("productCart.ejs");
    },
    productDetail: (req, res) => { 
        return res.render("productDetail.ejs");
    }
}

module.exports = controller