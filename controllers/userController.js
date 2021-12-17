/*aquí ira el load de una DataBase */

const controller = {
    login: (req, res) => { 
        // aquí faltan las cosas que se envien por el CRUD
        return res.render("login.ejs");
    },
    register: (req, res) => { 
        // aquí faltan las cosas que se envien por el CRUD
        return res.render("register.ejs");
    }
}

module.exports = controller