/*aquí ira el load de una DataBase */

const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const controller = {
  profile: (req, res) => {
    let user = req.session.userLogged;
    return res.render("profile.ejs", { user });
  },
  profileEdit: (req, res) => {
    let user = req.session.userLogged;
    return res.render("profileEdit.ejs", { user });
  },
  profileEditUp: (req, res) => {
    const resultVal = validationResult(req);

    if (!resultVal.isEmpty()) {
      return res.render("profileEdit.ejs", {
        errors: resultVal.mapped(),
        old: req.body,
      });
    }
    const file = req.file;
    if (!file) {
      const error = new Error("No hta seleccionado un archivo");
      error.httpStatusCode = 400;
      return res.render("error400.ejs");
    }

    const user = users.find((u) => u.email == req.body.email);
    const idx = users.findIndex((u) => u.email == req.body.email);

    //Eliminar campo tras corroborar:
    delete req.body.passwordVal;

    //edición del Json a nivel local por indice:
    users[idx] = {
      ...req.body,
      image: file.originalname,
    };

    //almacenando cambios en JSON
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));

    //Cambiar esto por un redirect cuando el programa RECUERDE al usuario
    return res.render("profile.ejs", { user });
  },
  login: (req, res) => {
    return res.render("login.ejs");
  },
  logger: (req, res) => {
    const user = users.find((u) => u.email == req.body.email);

    if (user == undefined) {
      //Usuario no encontrado:
      return res.render("register.ejs", {
        errors: {
          reg: {
            msg: "Usted no tiene cuenta, favor de registrarse",
          },
        },
      });
    }
    console.log(user.password);
    console.log(req.body.password);
    if (!bcryptjs.compareSync(req.body.password, user.password)) {
      return res.render("login.ejs", {
        errors: {
          passwordErr: {
            msg: "Contraseña Incorrecta",
          },
        },
      });
    }
    if (user.password) {
      //delete user.password;
    }
    req.session.userLogged = user;

    if (req.body.recordarUsuario) {
      res.cookie("userEmail", req.body.email, { maxAge: 1000 * 3600 });
    }

    return res.render("profile.ejs", { user });
  },
  logout: (req, res) => {
    //matamos session
    req.session.destroy();
    res.clearCookie("userEmail");
    //delete req.cookie.userEmail;
    return res.redirect("/");
  },
  register: (req, res) => {
    res.cookie("testing", "hola mundo", { maxAge: 1000 * 30 });
    return res.render("register.ejs");
  },
  registed: (req, res) => {
    //Validar
    const resultVal = validationResult(req);

    if (!resultVal.isEmpty()) {
      return res.render("register.ejs", {
        errors: resultVal.mapped(),
        old: req.body,
      });
    }
    //Si no tiene errores revisamos si existe el usuario
    const user = users.find((u) => u.email == req.body.email);

    if (user == undefined) {
      //manipulación del usuario a guardar
      const newUser = req.body;
      delete newUser.passwordVal;
      newUser.password = bcryptjs.hashSync(req.body.password, 10);
      users.push(newUser);

      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));

      return res.render("profile.ejs", { user: newUser });
    } else {
      //El usuario ya tiene cuenta, lo indicamos
      return res.render("register.ejs", {
        errors: {
          email: {
            msg: "Dicho correo ya está en uso por otro usuario",
          },
        },
        old: req.body,
      });
    }
  },
};

module.exports = controller;
