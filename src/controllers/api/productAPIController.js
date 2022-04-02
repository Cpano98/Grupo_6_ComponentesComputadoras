const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

// Sequelize requirements
const db = require("../../database/models");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const Products = db.Product;


//Definición de controlador exportable
const productAPIController ={
  'list': (req, res) => {
    Products.findAll()
    .then((products) => {
        let respuesta = {
          meta: {
              status: 200,
          },
          data: {
            totalProducts: products.length,
            allProducts: products,
            lastProduct: products.pop(),
          }
        }
        return res.json(respuesta);  
    })  
  },
  'detail': (req, res) => {
    // Sequelize Implementation
    Products.findByPk(req.params.id)
      .then((product) => {
        let respuesta = {
          meta: {
              status: 200,
          },
          data: product
      }
      return res.json(respuesta);
      })
  },
  'categories':(req,res)=>{
    Products.count({
      group:['category']
    })
    .then( categories=>{
      //console.log(categories)
      let respuesta = {
        meta: {
            status: 200,
          },
          data: categories
        }
      
      return res.json(respuesta);
    })

    
  }
}
module.exports = productAPIController;