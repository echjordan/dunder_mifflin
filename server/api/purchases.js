const router = require('express').Router()
const {Purchase, Order, Product} = require('../db/models')
const bodyParser = require ('body-parser')
module.exports = router

router.get('/', (req, res, next) => {
  Purchase.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})
router.post('/', (req, res, next) => {
  const prod = req.body.productId;
  const ord = req.body.orderId;
  const qty = req.body.quantity;
  Purchase.create(
    {productId: prod, orderId: ord, quantity: qty}
  )
  .then(purchase => res.json(purchase))
  .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  Purchase.findAll({
    where: {orderId: req.params.orderId},
    include: [{all: true}]

  })
    .then(order => res.json(order))
    .catch(next)
})
