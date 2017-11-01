const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./Product')

const Purchase = db.define('purchase', {
  quantity: {
    type: Sequelize.INTEGER
  }
  }
)

module.exports = Purchase;
