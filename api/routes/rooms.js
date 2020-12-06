var express = require('express');
var router = express.Router();
var Room = require('../db/models').Room;
var Profile = require('../db/models').Profile;
var Message = require('../db/models').Message;
const { Op } = require("sequelize");
const asyncHandler = require('../utils/asyncHandler.js');

// POST create new room
router.post('/create', asyncHandler( async (req, res) => {

    
    const room = await Room.create({
        name: req.body.room_name,
        skip_vote: 0
    });
    
    const profile = await Profile.create({
        user_id: req.body.id,
        image: req.body.image,
        room_id: room.id
    })
    
    res.json(room.dataValues);
}));

// POST find and join existing room
router.post('/join', asyncHandler( async (req, res) => {

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
}));

// GET average sentiment of a room
router.get('/sentiment/:room_id', asyncHandler( async (req, res) => {

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

    // add sentiment values together
    allMessages.forEach( message => {
        if (message.sentiment) {
            sentimentCounter++;
            sentimentTotal += message.sentiment;
        }
    })

    res.json({ sentiment: sentimentTotal/sentimentCounter })
}));

// GET all Rooms a User is a part of
router.get('/user/:user', asyncHandler( async (req, res) => {

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
}));

// GET playlist array of objects
router.get('/playlist/:room', asyncHandler( async (req, res) => {
    console.log( typeof req.params.room)
    if (req.params.room != 'undefined' ) {
        const room = await Room.findByPk(req.params.room);
        res.json(Object.values(JSON.parse(room.playlist)))
    } else {
        throw new Error("undefined");
    }
}))

// PUT a new name into a room
router.put('/invite', asyncHandler( async (req, res) => {
    const roomToRename = await Room.findByPk(req.body.room_id);
    roomToRename.name = req.body.room_name;
    roomToRename.save();

    res.json(roomToRename)
}));

// PUT a new track onto playlist
router.put('/add-track', asyncHandler( async (req, res) => {

    const room = await Room.findByPk(req.body.room.id);

    const currentPlaylist = JSON.parse(room.playlist)
    const newSong = req.body.track
    let arrayToUpdate = []

    if (room.playlist) {
        arrayToUpdate = [ ... currentPlaylist, newSong ]
    } else {
        arrayToUpdate = [ newSong ]
    }

    if (room) {
        await room.update({
            playlist: JSON.stringify(arrayToUpdate)
        })
    }

    res.json({status: 200});
}));

// DELETE a room by id
router.delete('/delete', asyncHandler( async (req, res) => {
    const roomToDelete = await Room.findByPk(req.body.room_id);
    
    // TODO: delete profiles in the room
    const profilesToDelete = await Profile.findAll({
        where: {
            room_id: roomToDelete.id
        }
    })

    profilesToDelete.forEach( async (profile) => {
        await profile.destroy();
    })
    
    await roomToDelete.destroy();
    
    res.json({status: 200});
}));

// DELETE first track in playlist
router.delete('/remove-first-track/:room', asyncHandler( async (req, res) => {

}))

module.exports = router;
