/*aquí ira el load de una DataBase */

const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

// Sequelize requirements
const db = require("../database/models");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const Users = db.User;

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
			.then((UserInfo) => {

				let userRegistration = UserInfo.dataValues.username
				console.log("Username: " + userRegistration);

				if (userRegistration == null || userRegistration == undefined) {
					console.log("Verificacion")
					res.redirect("/")

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
	eliminarUsuario: (req, res) => {
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
};

module.exports = userController;
