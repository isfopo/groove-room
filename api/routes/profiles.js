var express = require('express');
var router = express.Router();
var Room = require('../db/models').Room;
var Profile = require('../db/models').Profile;

// get Profiles matching room_id
router.get('/:room_id', async(req, res) => {
    const profiles = await Profile.findAll({
        where: {
            room_id: req.params.room_id
        }
    })

    res.json(profiles)
})

module.exports = router;