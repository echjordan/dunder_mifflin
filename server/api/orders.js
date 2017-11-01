const router = require('express').Router();
const {Purchase, Order} = require('../db/models');

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{all: true, nested: true}]
  })
    .then(orders => res.json(orders))
    .catch(next)
})
router.post('/', (req, res, next) => {
  Order.create(
    {
      email: req.body.email,
      address: req.body.address,
      userId: req.body.userId,
      subTotal: req.body.subTotal,
      status: 'Processing'
    })
  .then(order => {
    order.createPurchase({
      productId: req.body.productId,
      quantity: req.body.quantity,
      price: req.body.price
    })
  })
    .then(order => res.json(order))
    .catch(next)
})
router.get('/status', (req, res, next) => {
  Order.findAll({
    where: {status: req.query.status}
  })
  .then(orders => res.json(orders))
  .catch(next)
})
router.get('/date', (req, res, next) => {
  Order.findAll({
    where: {createdAt: req.query.date}
  })
  .then(orders => res.json(orders))
  .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  Order.findOne({
    where: {id: req.params.orderId}
  })
  .then(order => res.json(order))
  .catch(next)
})

router.get('/:orderId/products', (req, res, next) => {
  Order.findOne({
    where: {id: req.params.orderId}
  })
  .then(order => order.getPurchases())
  .then(purchases => res.json(purchases))
  .catch(next)
} )

router.put('/:orderId/status', (req, res, next) => {
  Order.update(
    {status: req.body.status},
    {where: {id: req.params.orderId}})
  .then(newOrder => res.json(newOrder))
  .catch(next)
})

module.exports = router;
