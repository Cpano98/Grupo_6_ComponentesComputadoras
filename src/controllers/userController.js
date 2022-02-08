/*aquí ira el load de una DataBase */

const fs = require('fs');
const path = require('path');
const {validationResult} = require("express-validator")

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    profile:  (req,res) => {
        //Si hay usuario logeado se debe mostrar** 
        //Usando cookies***
        return res.render("profile.ejs")
        //Si no lo hay debemos redirigir a login
    },
    profileEdit: (req, res) =>{
        //mandar el usuario para rellenar defaults
        const user = users.find(u => u.email == req.body.email)
        return res.render("profileEdit.ejs", {user})
    },
    profileEditUp: (req, res)=>{
        //Validar
        const resultVal = validationResult(req);
        
        if (!resultVal.isEmpty()){
            return res.render('profileEdit.ejs', {
                errors:resultVal.mapped(),
                old:req.body })
        }
        const file = req.file
        if(!file){
            const error = new Error('No hta seleccionado un archivo')
            error.httpStatusCode = 400;
            return res.render('error400.ejs')
        }

        //mandar el usuario para rellenar defaults
        const user = users.find(u => u.email == req.body.email)
        const idx =  users.findIndex(u => u.email == req.body.email);

        
        //Eliminar campo tras corroborar:
        delete req.body.passwordVal

        //edición del Json a nivel local por indice:
        users[idx] ={
            ...req.body,
            image: file.originalname
        }
        
        //almacenando cambios en JSON
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '))

        //Cambiar esto por un redirect cuando el programa RECUERDE al usuario
        return res.render("profile.ejs", {user})
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
        //Validar
        const resultVal = validationResult(req);
        
        if (!resultVal.isEmpty()){
            return res.render('register.ejs', {
                errors:resultVal.mapped(),
                old:req.body })
        }

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