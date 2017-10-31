const Sequelize = require('sequelize')
const db = require('../db')

const Purchase = db.define('purchase', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = Purchase;
