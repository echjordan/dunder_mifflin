const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Order = require('./order');
const Review = require('./review');
const Purchase = require('./purchase');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Category.belongsToMany(Product, {through: 'CategoryProduct'});
Product.belongsToMany(Category, {through: 'CategoryProduct'});

Review.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(Product);
Product.hasMany(Review);
User.hasMany(Order);
Order.belongsTo(User);

Purchase.belongsTo(Order);
Order.hasMany(Purchase);
Product.hasMany(Purchase);
Purchase.belongsTo(Product);


// Order.belongsToManyProduct({through: Purchase})
// Product.belongsTo(Order);
// Order.hasMany(Product);


module.exports = {
  User, Product, Category, Review, Order, Purchase
}
