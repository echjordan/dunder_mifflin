const Sequelize = require('sequelize')
const db = require('../db')
// const Product = require('./Product')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  }
}
)

Category.byName = function(name) {
  return Category.findOrCreate({ where: { name } })
    .then(([cat]) => cat)
}

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
