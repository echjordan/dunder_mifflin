const crypto = require('crypto')
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
  // // items: {
  // //     type: Sequelize.ARRAY(Sequelize.ARRAY)
  // // },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: {msg: 'Must be an email'}
    }
  },
    date: {
      type: Sequelize.DATE,
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
