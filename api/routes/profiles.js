var express = require('express');
var router = express.Router();
var Room = require('../db/models').Room;
var Profile = require('../db/models').Profile;
const asyncHandler = require('../utils/asyncHandler.js');
var prettyjson = require('prettyjson'); // TODO: delete for production

// GET Profile by id
router.get('/:id', asyncHandler( async (req, res) => {
    const profile = await Profile.findByPk(req.params.id);

    res.json(profile);
}));

// GET Profiles in Room
router.get('/room/:room_id', asyncHandler( async (req, res) => {
    const profiles = await Profile.findAll({
        where: {
            room_id: req.params.room_id
        }
    })

    res.json(profiles)
}));

// PUT update listening_to
router.put('/listening-to', asyncHandler( async (req, res) => {

    console.log(prettyjson.render(req.body))
    const profile = await Profile.findByPk(req.body.profile_id);

    await profile.update({
        listening_to: req.body.track_id
    })
        .then( res.status(200) )
        .catch( res.status(500) )
}))

// TODO: add an SSE path that triggers profile update

// DELETE Profile
router.delete('/delete', asyncHandler( async (req, res) => {

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
}));

module.exports = router;