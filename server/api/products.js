const {Promise} = require('sequelize')
const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

router.get('/search', (req, res, next) => {
  Product.findOne({
    where: {title: req.query.title}
  })
  .then(product => res.json(product))
  .catch(next)
})

// Load a product by id if we see a :productId param

// const fetch = Model =>
//   function fetchModelAndAddToRequest(req, res, next) {
//     return Model.findById(req.params[Model.name + 'Id'])
//     .then(thing => {
//       req[Model.name] = thing
//       next()
//     })
//     .catch(next)
//   }

function fetchProductAndAddToRequest(req, res, next) {
  return Product.findById(req.params.productId)
    .then(product => {
      req.product = product
      return next()
    })
    .catch(next)
}

router.param('productId', fetchProductAndAddToRequest)


router.get('/:productId', (req, res, next) =>
  res.send(req.product))

router.get('/:productId/reviews', (req, res, next) => {
  req.product.getReviews()
  .then(reviews => res.json(reviews))
  .catch(next)
})

router.post('/:productId/reviews', (req, res, next) => {
  //add middleware for being logged in
  const {title, content, stars, productId} = req.body
  const userId = req.user.id
  const newReview = {
    title, stars, content, userId, productId
  }
  req.product.createReview(newReview)
  .then(() => {req.product.reload()})
  .then(product => {res.json(product)})
  .catch(err => console.error(err))
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
  .then(product =>
    product.setCategoriesByName(req.body.categories))
  .then(() => res.sendStatus(200))
  .catch(next)
})

router.put('/:productId', (req, res, next) => {
  req.product.update(req.body)
  .then(() =>
    req.product.setCategoriesByName(req.body.categories))
  .then(() => res.sendStatus(200))
  .catch(next)
})
