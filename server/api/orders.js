const router = require('express').Router();
const {Purchase, Order} = require('../db/models');

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{all: true, nested: true}]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

//This needs to talk to a thunk creator that will send back an array of objects containing purcahses
router.post('/', (req, res, next) => {
  let theId;
  if (req.user)  {
    theId = req.user.id
  }
  Order.create(
    {
      email: req.body.email,
      address: req.body.address,
      userId: theId,
      subTotal: req.body.subTotal,
      status: 'Processing'
    })
  .then(order => {
    const orderId = order.id
    const purchases = req.body.purchases
    purchases.forEach(purchase => {
      order.createPurchase({
        orderId: orderId,
        productId: purchase.productId,
        quantity: purchase.quantity,
        price: purchase.price
      })
    })
  })
    .then(() => res.sendStatus(200))
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

router.put('/:orderId', (req, res, next) => {
  Order.update(
    {status: req.body.status},
    {where: {id: req.params.orderId}})
  .then(() => res.sendStatus(200))
  .catch(next)
})

module.exports = router;
