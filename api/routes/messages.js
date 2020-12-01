const express = require('express');
const router = express.Router();
const getSentiment = require('../utils/getSentiment.js');

const Room = require('../db/models').Room;
const Profile = require('../db/models').Profile;
const Message = require('../db/models').Message;


// GET all messages from a Profile
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

// TODO: GET all messages in Room
router.get('/room/:id', async (req, res) => {
    res.json(messages);
})

// POST new Message
router.post('/create', async (req, res) => {

    const message = await Message.create({
        content: req.body.content,
        profile_id: req.body.profile_id,
        sentiment: getSentiment(req.body.content)
    })

    res.sendStatus(200);
})

module.exports = router;