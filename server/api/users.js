const router = require('express').Router();
const {User} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll()
  .then(users => res.json(users))
  .catch(next)
})

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(user => res.json(user))
  .catch(next)
})

router.put('/:userId', (req, res, next) => {
  User.update(req.body, {
    where: {
      id: req.params.userId
    }
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})

router.delete('/:userId', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.userId
    }
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})

// HAVEN'T TESTED
router.get('/:userId/reviews', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.getReviews())
    .then(reviews => res.json(reviews))
    .catch(next)
})
