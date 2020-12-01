var express = require('express');
var router = express.Router();
var Room = require('../db/models').Room;
var Profile = require('../db/models').Profile;

// GET Profile by id
router.get('/:id', async (req, res) => {
    const profile = await Profile.findByPk(req.params.id);

    res.json(profile);
})

// GET Profiles in Room
router.get('/room/:room_id', async (req, res) => {
    const profiles = await Profile.findAll({
        where: {
            room_id: req.params.room_id
        }
    })

    res.json(profiles)
})

// DELETE Profile
router.delete('/delete', async (req, res) => {

    // find profile to delete
    const profileToDelete = await Profile.findByPk(req.body.profile_id);
    await profileToDelete.destroy();
    
    // check of other profiles with that room id
    const otherProfilesInRoom = await Profile.findAll({
        where: {
            room_id: req.body.room_id
        }
    })

    // if there are none, delete room
    if ( otherProfilesInRoom.length === 0 ) {
        const roomToDelete = await Room.findByPk(req.body.room_id);
        await roomToDelete.destroy();
    }

    res.json({status: 200})
})

module.exports = router;