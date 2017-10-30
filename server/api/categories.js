const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/:categoryId', (req, res, next) => {
  Category.findOne({include: [{all: true}]}, {
    where: {id: req.params.categoryId}
  })
    .then(categories => res.json(categories))
    .catch(next)
})
