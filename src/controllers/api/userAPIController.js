// Sequelize requirements
const db = require("../../database/models");
const Op = db.Sequelize.Op;
const Users = db.User;

//Definición de controlador exportable
const userAPIController ={
  'list': (req, res) => {
    console.log('paco')
  },
  'detail': (req, res) => {
    // Sequelize Implementation
    Products.findByPk(req.params.id)
      .then((product) => {
        
        let respuesta = {
          meta: {
              status: 200,
              url: '/api/product/:id'
          },
          data: product
        }
        res.json(respuesta)
      })
      
  },
}
module.exports = userAPIController;