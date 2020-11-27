var express = require('express');
var router = express.Router();
var User = require('../db/models').User;

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/', async (req, res) => {
  const user = await User.findOrCreate({
    where: {
      name: req.body.display_name,
      image: req.body.images[0].url
    }
  });
  res.json(user);
});

module.exports = router;
