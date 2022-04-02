const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

// Sequelize requirements
const db = require("../../database/models");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const Users = db.User;


//Definición de controlador exportable
const userAPIController ={
  'list': (req, res) => {
    Users.findAll()
    .then((users) => {
        let respuesta = {
          meta: {
              status: 200,
          },
          data: {
            totalusers: users.length,
            allusers: users,
            lastuser: users.pop(),
          }
        }
        return res.json(respuesta);  
    })  
  },
  'detail': (req, res) => {
    // Sequelize Implementation
    Users.findByPk(req.params.id)
      .then((user) => {
        let respuesta = {
          meta: {
              status: 200,
          },
          data: user
      }
      return res.json(respuesta);
      })
  }
}
module.exports = userAPIController;