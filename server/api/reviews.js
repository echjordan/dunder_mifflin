const router = require('express').Router();
const {Review} = require('../db/models');


router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next)
})

// handling in product routes
// router.get('/product', (req, res, next) => {
//   // query by productID
//   Review.findAll({
//     where: {productId: req.query.id}
//   })
//   .then(reviews => res.json(reviews))
//   .catch(next)
// })

// handling in user routes
// router.get('/user', (req, res, next) => {
//   // query by userID
//   Review.findAll({
//     where: {userId: req.query.id}
//   })
//   .then(reviews => res.json(reviews))
//   .catch(next)
// })

router.get('/:reviewId', (req, res, next) => {
  Review.findOne({
    where: {id: req.params.reviewId}
  })
  .then(review => res.json(review))
  .catch(next)
})


router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(() => res.sendStatus(200))
  .catch(next)
})

module.exports = router;
