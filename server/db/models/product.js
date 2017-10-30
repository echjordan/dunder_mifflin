const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  photos: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  available:  {
    type: Sequelize.BOOLEAN
  }

})

module.exports = Product;

//Method to edit the quantity of a product
/**
 * instanceMethods
 */
Product.prototype.changeQuantity= function (amount) {
  return this.quantity += amount;
}

