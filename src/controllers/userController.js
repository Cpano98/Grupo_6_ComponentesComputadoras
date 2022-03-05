/*aquí ira el load de una DataBase */

const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

//const usersFilePath = path.join(__dirname, "../data/users.json");
//const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

// Sequelize requirements
const db = require("../database/models");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const Users = db.User;

//Constantes globales:
const saltRounds = 10;

const userController = {
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
			const error = new Error("No ha seleccionado un archivo");
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
		//fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));

		//Cambiar esto por un redirect cuando el programa RECUERDE al usuario
		return res.render("profile.ejs", { user });
	},
	login: (req, res) => {
		return res.render("login.ejs");
	},
	logger: (req, res) => {
		// Buscamos al usuario en la base de datos no en el script
		// ANTES:
		//const user = users.find((u) => u.email == req.body.email);
		// AHORA, dentro de una promesa:
		Users.findOne({ where: { email: req.body.email } })
		.then((userInfo) => {
				
			if(!userInfo){
				return res.render("register.ejs", {
					errors: {
						reg: {
							msg: "Usted no tiene cuenta, favor de registrarse",
						},
					},
				});
			}
			
			//Usuario encontrado, validando contraseña
			console.log(req.body.password)
			console.log(userInfo.dataValues.pass)
		
			//let passHash = bcryptjs.hashSync(password, bcryptjs.genSaltSync(saltRounds))
			let comparison2 = bcryptjs.compareSync(req.body.password, userInfo.dataValues.pass)
			console.log(comparison2)
			
			
			/*
			if (!bcryptjs.compareSync(req.body.password, userInfo.dataValues.pass)) {
				return res.render("login.ejs", {
					errors: {
						passwordErr: {
							msg: "Contraseña Incorrecta",
						},
					},
				});
			}
			*/
			
			//Usuario validado, procediento
			/*
			if (userInfo.dataValues.password) {
				//* * * * * * * *
				// posible error al borrar user.password tras el loggeo exitoso
				delete userInfo.dataValues.password;
			}
			*/
			//Almacenando usuario en variable session, SIN password:
			req.session.userLogged = userInfo.dataValues
			//Sí la checkbox fue marcada, creamos la cookie:
			if (req.body.recordarUsuario) {
				res.cookie("userEmail", req.body.email, { maxAge: 1000 * 3600 });
			}
			return res.render("profile.ejs", { user:userInfo.dataValues });

		})
	

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
	registerUp: (req, res) => {
		//Validar
		const resultVal = validationResult(req);

		if (!resultVal.isEmpty()) {
			return res.render("register.ejs", {
				errors: resultVal.mapped(),
				old: req.body,
			});
		}
		
		Users.findOne({ where: { email: req.body.email } })
			//Si se encuentra un usuario:
			.then( (UserInfo) => {
				console.log(UserInfo)		
				
				if(UserInfo != null)
				{
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
				//APARENTEMENTE debe instanciarse a fuerzas
				let passHash = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(saltRounds))
				console.log(passHash+' pass ')

				//Revision del hash
				console.log('Salio:' + bcryptjs.compareSync(req.body.password, passHash) )

				Users.create({
					name: req.body.name,
					username: req.body.username,
					email: req.body.email,
					pass: passHash, //req.body.password, 
					role: "client",
					img: "images/users/default.jpg"
				}).then((user) => {
					//* * * * */
					// eliminamos la propiedad password antes de enviarlo:
					
					// la primera vez que el usuario se registra se guarda en session, pero no en cookies
					req.session.userLogged = user.dataValues
					
					return res.render("profile.ejs", { user: user.dataValues });
				});
				
			})
			.catch((err) => {
				console.log('YES')
				//Sino se encuentra ningún usuario, lo creamos 
				
			});
	},
	eliminarUsuario: (req, res) => {
		console.log(req.session.userLogged)
		
		Users.destroy({
			where: { id: req.params.id },
		})
		.then(() => {
			res.redirect("/products/admin/listUsers");
		})
		.catch((err) => {
			res.render("error404", { status: 404, url: req.url });
		});
		
	},
	editUserAdmin: (req, res) => {

		Users.findOne({ where: { id: req.params.id } })
			.then((UserInfo) => {

				let userRegistration = UserInfo.dataValues
				//console.log("Username: " + userRegistration);
				res.render("editUserbyAdmin.ejs", { user:userRegistration })
			})
			.catch((err) => {
				Users.create({
					name: req.body.name,
					username: req.body.username,
					email: req.body.email,
					pass: req.body.password,
					role: "client",
					img: "images/users/default.jpg"
				}).then((user) => {
					return res.render("profile.ejs", { user });
				});
			});
	},
	editUserAdminPost: (req, res) => {
		console.log("Info del usuario a editar:")
		console.log(req.body)
		
		Users.update({
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			role: req.body.role,
			pass: req.body.password,
		  },
		  {
			where: { 
				id: req.body.id 
			},
		  }).then( (UserInfo) => {
			res.redirect("/products/admin/listUsers")
		  });
		  
	},
};

module.exports = userController;
