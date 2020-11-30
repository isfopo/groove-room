var express = require('express');
var router = express.Router();
var User = require('../db/models').User;

// GET users listing
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

// POST new user or return existing user
router.post('/', async (req, res) => {
  const user = await User.findOrCreate({
    where: {
      name: req.body.display_name
    }
  });
  
  user[0].image = req.body.images[0].url;
  await user[0].save();

  res.json(user);
});

module.exports = router;
