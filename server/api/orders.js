const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})
router.get('/search', (req, res, next) => {
  Order.findOne({
    where: {status: req.query.status}
  })
  .then(orders => res.json(orders))
  .catch(next)
})
router.get('/date', (req, res, next) => {
  Order.findOne({
    where: {createdAt: req.query.date}
  })
  .then(orders => res.json(orders))
  .catch(next)
})
router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId,
  {incude: [{all: true}]})
    .then(order => res.json(order))
    .catch(next)
})
router.put('/:orderId', (req, res, next) => {
  Order.update(req.body, {
    where: {id: req.params.orderId}
  })
    .then(order => res.json(order))
    .catch(next)
})
