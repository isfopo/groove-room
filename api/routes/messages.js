const express = require('express');
const router = express.Router();
const EventEmitter = require('events');
const emitter = new EventEmitter();
const getSentiment = require('../utils/getSentiment.js');
const asyncHandler = require('../utils/asyncHandler.js');

const Room = require('../db/models').Room;
const Profile = require('../db/models').Profile;
const Message = require('../db/models').Message;

// GET last message from a Profile
router.get('/last/:id', asyncHandler( async (req, res) => {
    
    const allMessages = await Message.findAll({
        where: {
            profile_id: req.params.id
        }
    })
    if (allMessages.length === 0 )
    {
        res.status(404).json({ message: "No messages to display" })
    } else {
        res.json({
            status: 200,
            ...allMessages[allMessages.length - 1]
        })
    }
}))

// GET SSE a new message has been sent
router.get('/update-profile/:id', asyncHandler( async ( req, res ) => {
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
      });
    res.flushHeaders();
    res.write('retry: 10000\n\n');

    // listen for message posted
    emitter.on('message-profile', messageProfileId => {
        // check if profile id matches
        // TODO: test this with another account
        if ( messageProfileId == req.params.id ) {
            // use res.write(`string`) to send the client a message
            res.write(`data: New message on this profile!\n\n`)
        }
    })
}));

// GET all messages in Room
router.get('/room/:id', asyncHandler( async (req, res) => {

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

    res.json(roomMessages);
}))

// GET SSE a new message has been sent
router.get('/update-room/:ids', asyncHandler( async ( req, res ) => {
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
      });
    res.flushHeaders();
    res.write('retry: 10000\n\n');

    const profileIds = JSON.parse( req.params.ids )
    
    emitter.on('message-room', messageProfileId => {
        
        // TODO: test this with another account
        // check if profile id matches any profiles in room
        const inThisRoom = profileIds.includes(messageProfileId)
        if ( inThisRoom ) {
            // use res.write(`string`) to send the client a message
            res.write(`data: New message in this room!\n\n`)
        }
    })
}));

// POST new Message
router.post('/create', asyncHandler( async (req, res) => {

    emitter.emit('message-room', req.body.profile_id);
    emitter.emit('message-profile', req.body.profile_id);
    //console.log(req.body)

    const message = await Message.create({
        content: req.body.content,
        profile_id: req.body.profile_id,
        sentiment: getSentiment(req.body.content)
    })

    res.sendStatus(200);
}))

module.exports = router;