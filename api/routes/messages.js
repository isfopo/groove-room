var express = require('express');
var router = express.Router();
var Room = require('../db/models').Room;
var Profile = require('../db/models').Profile;
var Message = require('../db/models').Message;

// GET all messages from a Profile
router.get('/profile/:id', async (req, res) => {


    res.json(messages);
})

// GET all messages in Room
router.get('/room/:id', async (req, res) => {


    res.json(messages);
})

// POST new Message
router.post('/create', async (req, res) => {
    const message = await Message.create({
        content: req.body.content,
        profile_id: req.body.profile_id
    })

    res.json(message)
})

module.exports = router;