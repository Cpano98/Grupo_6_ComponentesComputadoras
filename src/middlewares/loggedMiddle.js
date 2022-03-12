//Global middleware para autorizar acceso a otras páginas


const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function loggedMiddle(req, res, next){
    
    /* * * * * * * 
     * Modificar la bandera global de locals.isLogged 
     * para que tenga 3 valores: 
     * admin, guest, user
     * Respectivamente asignar los valores si está o no loggeado
     * y su nivel según la DB
     * 
     *      
     */

    res.locals.isLogged = false; //Bandera global

    //Permite revisar y cargar el usuario desde cookie
    let userFromCookie = users.find(u => u.email == req.cookies.userEmail)
    if(userFromCookie){
        req.session.userLogged = userFromCookie; 
    }


    if(req.session && req.session.userLogged){ 
        res.locals.isLogged = true; //Bandera global
    }   res.locals.userLogged = req.session.userLogged; //Usuario global
    next();
} 

module.exports = loggedMiddle;