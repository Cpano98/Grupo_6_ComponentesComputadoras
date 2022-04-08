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
		//eliminamos el pass antes de enviar
		//console.log(user)
		
		return res.render("profile.ejs", { user });

	},
	profileUp: (req, res) => {

		
		//Carga de datos originales:
		let user = req.session.userLogged;
		const file = req.file;
		const resultVal = validationResult(req);
		
		if (!resultVal.isEmpty()) {
			//console.log(resultVal)
			return res.render("profile.ejs", {
				errors: resultVal.mapped(),
				old: req.body,
				user
			});
		}
	
		
		for( element in req.body){
			if(user[element]){
				//planchado en user
				user[element]=req.body[element]
			}
		}
		
		//Update del campo img
		user['img'] = !file ? user['img'] : "/images/users/"+file.filename
		
		//Si el passwordNew es diferente a vacio y llegamos aquí le actualizamos
		if(req.body.passwordNew!=''){
			user['pass'] = bcryptjs.hashSync(req.body.passwordNew, bcryptjs.genSaltSync(saltRounds)) 
		}

		
		Users.update(user,
		  {
			where: { 
				id: user.id 
			},
		  }).then( (UserInfo) => {
				
				return res.render("profile.ejs", { user });
		  });
		
	
		
	},
	login: (req, res) => {
		return res.render("login.ejs");
	},
	logger: (req, res) => {
		//Antes de buscar al usuario, revisamos los errores del formulario
		const resultVal = validationResult(req);

		if (!resultVal.isEmpty()) {
			return res.render("login.ejs", {
				errors: resultVal.mapped(),
				old: req.body,
			});
		}

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
		
			if (!bcryptjs.compareSync(req.body.password, userInfo.dataValues.pass)) {
				return res.render("login.ejs", {
					errors: {
						password: {
							msg: "Contraseña Incorrecta",
						},
					},
				});
			}
			
			
			
			req.session.userLogged = userInfo.dataValues
			res.locals.isLogged = req.session.userLogged.role	;
		
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
				

				
				Users.create({
					name: req.body.name,
					username: req.body.username,
					email: req.body.email,
					pass: passHash, //req.body.password, 
					role: "Client",
					img: "/images/users/UserAvatar.jpeg"
				}).then((userInfo) => {
					
					
					// la primera vez que el usuario se registra se guarda en session, pero no en cookies
					req.session.userLogged = userInfo.dataValues
					return res.render("profile.ejs", { user: userInfo.dataValues });
				});
				
			})
			.catch((err) => {
				console.log('YES')
				//Sino se encuentra ningún usuario, lo creamos 
				
			});
	},
	deleteUser: (req, res) => {
		console.log('Estoy intando eliminar')
		
		
		//Evitar borrarse a uno mismo aquí?
		// * * * * * * 
		
		Users.destroy({
			where: { id: req.params.id},
		})
		.then(() => {
		
			res.redirect("/admin/listUsers");
		})
		.catch((err) => {
				console.log('Aquí va una ventana de error')
		});
		
	},
	editUserAdmin: (req, res) => {

		Users.findOne({ where: { id: req.params.id } })
			.then((userInfo) => {
				return res.render("editUserbyAdmin.ejs", { user:userInfo.dataValues })
		
			})
			.catch((err) => {
				Users.create({
					name: req.body.name,
					username: req.body.username,
					email: req.body.email,
					pass: bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(saltRounds)) ,
					role: "Client",
					img: "images/users/default.jpg"
				}).then((user) => {
					return res.render("profile.ejs", { user });
				});
			});
	},
	editUserAdminPost: (req, res) => {
		
		
		Users.update({
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			role: req.body.role,
			pass: bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(saltRounds)),
		  },
		  {
			where: { 
				id: req.body.id 
			},
		  }).then( (userInfo) => {
				req.session.userLogged =userInfo.dataValues
				res.redirect("/admin/listUsers")
		  });
		  
	},
};

module.exports = userController;
