const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Processing'
  },
  subTotal: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {msg: 'Must be an email'}
    }
  }
})

module.exports = Order;

// /**
//  * instanceMethods
//  */
Order.prototype.updateStatus = function (newStatus) {
  return this.update(
    {
      status: newStatus
    })
}
// /**
//  * classMethods
//  */

// /**
//  * hooks
//  */
