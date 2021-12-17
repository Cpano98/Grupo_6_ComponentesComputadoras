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
    }
}

module.exports = controller