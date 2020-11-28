var express = require('express');
var router = express.Router();
var Room = require('../db/models').Room;
var Profile = require('../db/models').Profile;
const { Op } = require("sequelize");

/* POST create new room */
router.post('/create', async (req, res) => {
    const room = await Room.create({
        name: req.body.room_name,
        skip_vote: 0
    });

    const profile = await Profile.create({
        user_id: req.body.id,
        image: req.body.image,
        room_id: room.id
    })

    res.json(room);
});

/* POST find and join existing room */
router.post('/join', async (req, res) => {

    // check if user already has a profile in requested room (profile has the same user_id and room_id)
    const userInRoom = await Profile.findAll({
        where: {
            [Op.and]: {
                user_id: req.body.user_id,
                room_id: req.body.room_id
            }
        }
    })

    // check if requested room exists
    const roomExists = await Room.findAll({
        where: {
            id: req.body.room_id
        }
    })

    if ( userInRoom.length > 0 ) {
        // if user is already in room, return "Not Modified"
        res.sendStatus(304);
    } else if ( roomExists.length === 0 ) {
        // if room does not exist, return "Not Found"
        res.sendStatus(404);
    } else {
        // is false, create profile with room_id and return confirmation message
        const addProfileToRoom = await Profile.create({
            user_id: req.body.user_id,
            image: req.body.image,
            room_id: req.body.room_id
        })
        res.sendStatus(200)
    }
})

/* GET all Rooms a User is a part of */
router.get('/:user', async (req, res) => {
    const userRooms = await Room.findAll()
    res.json(userRooms)
})

module.exports = router;
