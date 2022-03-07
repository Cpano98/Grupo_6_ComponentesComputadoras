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
	profileUp: (req, res) => {

		console.log('ESTOY EDITANDO AL USUARIO')
		//Carga de datos originales:
		let user = req.session.userLogged;
		
		const resultVal = validationResult(req);
		
		if (!resultVal.isEmpty()) {
			console.log(resultVal)
			return res.render("profile.ejs", {
				errors: resultVal.mapped(),
				old: req.body,
				user
			});
		}
		console.log("Emitido por el formulario:\n" )
		console.log(req.body)
		console.log("Emitido por la db:\n" )
		console.log(user)
		//Validación interna si hubo modificación de contraseña:
		/*
		[ body("password")
    .notEmpty()
    .withMessage("Ingrese una contraseña")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Al menos 8 caracteres")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Máximo 15 caracteres")
    .bail()
    .custom( (value, {req} ) =>{
      let condMayu = RegExp('[A-Z]').test(value) // mayus
      let condMinu = RegExp('[a-z]').test(value) // minus
      let condNumb = RegExp('[0-9]').test(value) // number
      let condSymb = RegExp('[^0-9a-zA-Z *]').test(value) // simbol
      console.log(condSymb)
      if(!condMayu){  throw new Error("Incluir al menos una mayúscula"); }  
      if(!condMinu){  throw new Error("Incluir al menos una minúscula"); }  
      if(!condNumb){  throw new Error("Incluir al menos un número"); }  
      if(!condSymb){  throw new Error("Incluir al menos un símbolo no númerico"); }  
      return true;
    }),
  body("passwordVal")
    .notEmpty()
    .withMessage("Repita su contraseña")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Contraseña no coincide");
      }
      return true;
    })]
		*/


		const file = req.file;
		console.log(file)
		/* Si no hay imagen no hay problema */
		/* Validación interna si se agregó una imagen*/

		// Datos viejos  ???
		// Datos nuevos: req.body

		//Formación de envio de datos a editar:

		// Update de aquellos elementos diferentes
		

		return res.render("profile.ejs", { user });
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
			
			
			//Usuario validado, procediento
			
			if(userInfo.dataValues.pass!=undefined) {
				//* * * * * * * *
				// posible error al borrar user.password tras el loggeo exitoso
				delete userInfo.dataValues.pass;
			}
			
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
					img: "images/users/default.jpg"
				}).then((userInfo) => {
					
					// eliminamos la propiedad password antes de enviarlo:
					if(userInfo.dataValues.pass!=undefined) {
						//* * * * * * * *
						// posible error al borrar user.password tras el loggeo exitoso
						delete userInfo.dataValues.pass;
					}
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
			

			//Este redirect puede ir a otro lado
			// * * * * 
			res.redirect("/");
		})
		.catch((err) => {
				console.log('Aquí va una ventana de error')
		});
		
	},
	editUserAdmin: (req, res) => {

		Users.findOne({ where: { id: req.params.id } })
			.then((userInfo) => {
			/* * * * * * *
			 * FALTA VALIDAR ESTE FORMULARIO NUEVO
		 	 *
			 *
			 */

				
			
				
				
				/*
        * Este render solo debe realizarse después de validar al usuario	
				*
				res.render("editUserbyAdmin.ejs", { 
					user:userInfo.dataValues, 
					old:req.body })
				*/
				res.render("editUserbyAdmin.ejs", { user:userInfo.dataValues })
		
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
		  }).then( (UserInfo) => {
			res.redirect("/products/admin/listUsers")
		  });
		  
	},
};

module.exports = userController;
