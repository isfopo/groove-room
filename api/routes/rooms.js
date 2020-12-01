var express = require('express');
var router = express.Router();
var Room = require('../db/models').Room;
var Profile = require('../db/models').Profile;
var Message = require('../db/models').Message;
const { Op } = require("sequelize");

// TODO: catch errors

// POST create new room
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
            image: req.body.user_image,
            room_id: req.body.room_id
        })
        res.sendStatus(200)
    }
})

// GET average sentiment of a room
router.get('/sentiment/:room_id', async (req, res) => {

    let allMessages = [];
    let sentimentTotal = 0;
    let sentimentCounter = 0;

    // get all messages in room
        // get all profiles in room
    const profiles = await Profile.findAll({
        where: {
            room_id: req.params.room_id
        }
    })

        // get all messages from all profiles

    for ( let i = 0; i < profiles.length; i++ ) {
        const messages = await Message.findAll({
            where: {
                profile_id: profiles[i].id
            }
        })

        allMessages.push(...messages);
    }

    allMessages = allMessages.map(result => result.dataValues)
    console.log(allMessages)

    // add sentiment values together
    allMessages.forEach( message => {
        if (message.sentiment) {
            sentimentCounter++;
            sentimentTotal += message.sentiment;
        }
    })

    res.json({ sentiment: sentimentTotal/sentimentCounter })
})

// GET all Rooms a User is a part of
router.get('/:user', async (req, res) => {

    const userRooms = []

    let userProfiles = await Profile.findAll({
        where: {
            user_id: req.params.user
        }
    })
    userProfiles = userProfiles.map(result => result.dataValues)
    
    for ( let i = 0; i < userProfiles.length; i++ ) {
        const room = await Room.findByPk(userProfiles[i].room_id);
        userRooms.push(room)
    }

    res.json(userRooms)
})

// PUT a new name into a room
router.put('/invite', async (req, res) => {
    const roomToRename = await Room.findByPk(req.body.room_id);
    roomToRename.name = req.body.room_name;
    roomToRename.save();

    res.json(roomToRename)
})

// DELETE a room by id
router.delete('/delete', async (req, res) => {
    const roomToDelete = await Room.findByPk(req.body.room_id);
    await roomToDelete.destroy();

    res.json({status: 200})
})

module.exports = router;
