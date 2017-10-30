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

router.get('/:productId', (req, res, next) => {
  Product.findOne({
    where: {id: req.params.productId}
  })
  .then(product => res.json(product))
  .catch(next)
})

// ADMIN ROUTES
router.post('/', (req, res, next) => {
  Product.create(req.body)
  .then(() => res.status(200))
  .catch(next)
})

router.put('/:productId', (req, res, next) => {
  Product.update(req.body, {
    where: {id: req.params.id}
  })
  .then(() => res.status(200))
  .catch(next)
})
