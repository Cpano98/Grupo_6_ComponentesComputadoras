//Global middleware para autorizar acceso a otras páginas

const fs = require('fs');
const path = require('path');
//const usersFilePath = path.join(__dirname, '../data/users.json');
//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

// Sequelize requirements
const db = require("../database/models");
const Users = db.User;

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
    

    if(!req.session.userLogged){
        res.locals.isLogged = 'Guest'; //Bandera global
    }else{
       
        res.locals.isLogged = req.session.userLogged.role; //Bandera global
        res.locals.userLogged = req.session.userLogged;
    }
    
    
   
    if(req.cookies.userEmail!=undefined){
        Users.findOne({ 
            where: { email: req.cookies.userEmail } 
            })
            .then((userFromCookie) => {
                //Tras encontrar al usuario:
               

                if(userFromCookie){
                    req.session.userLogged = userFromCookie; 
                }

                if(req.session && req.session.userLogged){ 
                    
                    res.locals.isLogged = 'Admin'; //Bandera global
                    res.locals.userLogged = req.session.userLogged; //Usuario global
                }   
                next();
            })
    }
    else{
        next();
    }



   
} 

module.exports = loggedMiddle;