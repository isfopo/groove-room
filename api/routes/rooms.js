var express = require('express');
var router = express.Router();
var Room = require('../db/models').Room;

/* GET profiles in room */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

/* POST create new room */
router.post('/create', async (req, res) => {
    const room = await Room.create({
        name: req.body.room_name,
        skip_vote: 0
    });
    res.json(room);
});

router.get('/:user', async (req, res) => {
    const userRooms = await Room.findAll()
    res.json(userRooms)
})

module.exports = router;
