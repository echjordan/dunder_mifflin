const Sequelize = require('sequelize')
const db = require('../db')
// const Product = require('./Product')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
  }
}
)

module.exports = Category;

// //Method to edit the quantity of a product
// /**
//  * Class Method
//  */
// Category.getProducts = function (theId)  {
//   return Category.findAll(
//     {where: {id: theId}}
//   )
// }
