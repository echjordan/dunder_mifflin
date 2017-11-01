const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: {
      args: [10, 500],
      msg: 'Please provide text within 10 to 500 characters.'
      }
    }
  }
})

module.exports = Review;
