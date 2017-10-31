const router = require('express').Router();
const {Review} = require('../db/models');


router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next)
})

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
