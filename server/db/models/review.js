const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false //can leave review with just stars if wanted? or no?
  },
  content: {
    type: Sequelize.TEXT
  }
}, {
    defaultScope: {
      include: [{model: User}] // eager loading
    }
  }
)

module.exports = Review;
