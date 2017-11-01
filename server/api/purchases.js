const router = require('express').Router();
const {Purchase} = require('../db/models');

router.get('/', (req, res, next) => {
  Purchase.findAll()
  .then(purchases => res.json(purchases))
  .catch(next)
})

module.exports = router;
