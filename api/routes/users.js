var express = require('express');
var router = express.Router();
var User = require('../db/models').User;

// POST new user or return existing user
router.post('/', async (req, res) => {
  const user = await User.findOrCreate({
    where: {
      name: req.body.display_name
    }
  });

  if (req.body.images.length > 0) {
    user[0].image = req.body.images[0].url;
    await user[0].save();
  } else {
    user[0].image = '/images/default-profile.png';
    await user[0].save();
  }

  res.json(user);
});

module.exports = router;
