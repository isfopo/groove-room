var express = require('express');
var router = express.Router();
var Room = require('../db/models').Room;
var Profile = require('../db/models').Profile;
const { Op } = require("sequelize");

// POST create new room
router.post('/create', async (req, res) => { // TODO: give room ids a hashed value
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

// POST find and join existing room
router.post('/join', async (req, res) => {

    const userInRoom = await Profile.findAll({
        where: {
            [Op.and]: {
                user_id: req.body.user_id,
                room_id: req.body.room_id
            }
        }
    })

    const roomExists = await Room.findAll({
        where: {
            id: req.body.room_id
        }
    })

    if ( userInRoom.length > 0 ) {
        res.sendStatus(304);
    } else if ( roomExists.length === 0 ) {
        res.sendStatus(404);
    } else {
        const addProfileToRoom = await Profile.create({
            user_id: req.body.user_id,
            image: req.body.image,
            room_id: req.body.room_id
        })
        res.sendStatus(200)
    }
})

// GET all Rooms a User is a part of
router.get('/:user', async (req, res) => {
    const userRooms = await Room.findAll()
    res.json(userRooms)
})

// PUT a new name into a room
router.put('/invite', async (req, res) => {

    const roomToRename = await Room.findByPk(req.body.room_id);
    roomToRename.name = req.body.room_name;
    roomToRename.save();

    res.json(req.body)
})

module.exports = router;
