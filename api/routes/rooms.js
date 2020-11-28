var express = require('express');
var router = express.Router();
var Room = require('../db/models').Room;
var Profile = require('../db/models').Profile;

/* GET profiles in room */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

/* POST create new room */
router.post('/create', async (req, res) => {
    const profile = await Profile.create({
        user_id: req.body.id,
        image: req.body.image
    })

    const room = await Room.create({
        name: req.body.room_name,
        skip_vote: 0,
        profile_id: profile.id
    });

    res.json(room);
});

router.get('/:user', async (req, res) => {
    const userRooms = await Room.findAll()
    res.json(userRooms)
})

module.exports = router;
