/*aquí ira el load de una DataBase */

const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    profile:  (req,res) => {
        //Si hay usuario logeado se debe mostrar** 
        //Usando cookies***
        return res.render("profile.ejs")
        //Si no lo hay debemos redirigir a login
    },

    login: (req, res) => { 
        return res.render("login.ejs");
    },
    logger: (req,res) =>{ 
        /* identificar usuario por correo */
        const user = users.find(u => u.email == req.body.email)
        if( user == undefined){
            //Usuario no encontrado:
            console.log("Usted no tiene cuenta")
            res.redirect("/user/register");
        }
        res.render("profile.ejs", {user});
    },
    register: (req, res) => { 
        return res.render("register.ejs");
    },
    registed: (req, res) =>{
        const user = users.find(u => u.email == req.body.email)
        if( user == undefined){
            //Usuario no encontrado, agregando
            console.log("Creando cuenta")
            
            //obtenemos la información enviada y eliminamos el objeto que no se almacena
            const newUser= req.body
            delete newUser.passwordVal;
            
            users.push(newUser)
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '))

            res.render("profile.ejs",{user});
        }
        else{
            //El usuario ya tiene cuenta, enviando
            return res.render("profile.ejs", {user})
        }   
    }
}

module.exports = controller