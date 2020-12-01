const express = require('express');
const router = express.Router();
const getSentiment = require('../utils/getSentiment.js');

const Room = require('../db/models').Room;
const Profile = require('../db/models').Profile;
const Message = require('../db/models').Message;

// TODO: handle errors

// GET last message from a Profile
router.get('/last/:id', async (req, res) => {

    const allMessages = await Message.findAll({
        where: {
            profile_id: req.params.id
        }
    })
    if (allMessages.length === 0 )
    {
        res.json({
            status: 404
        })
    } else {
        res.json({
            status: 200,
            ...allMessages[allMessages.length - 1]
        })
    }
})

// GET all messages in Room
router.get('/room/:id', async (req, res) => {

    const roomMessages = [];

    // get all profiles in room
    let profiles = await Profile.findAll({
        where: {
            room_id: req.params.id
        }
    })
    profiles = profiles.map(result => result.dataValues)

    // get all messages for each profile, put in array
    for ( let i = 0; i < profiles.length; i++ ) {
        const messages = await Message.findAll({
            where: {
                profile_id: profiles[i].id
            }
        });
        roomMessages.push(...messages)
    }

    // sort from oldest to newest

    res.json(roomMessages);
})

// POST new Message
router.post('/create', async (req, res) => {

    console.log(req.body.profile_id);
    const message = await Message.create({
        content: req.body.content,
        profile_id: req.body.profile_id,
        sentiment: getSentiment(req.body.content)
    })

    res.sendStatus(200);
})

module.exports = router;