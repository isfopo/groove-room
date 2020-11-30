var express = require('express');
var router = express.Router();
var Room = require('../db/models').Room;
var Profile = require('../db/models').Profile;

// GET Profiles in Room
router.get('/:room_id', async (req, res) => {
    const profiles = await Profile.findAll({
        where: {
            room_id: req.params.room_id
        }
    })

    res.json(profiles)
})

// DELETE Profile
router.delete('/delete', async (req, res) => {

    const profileToDelete = await Profile.findByPk(req.body.profile_id);
    await profileToDelete.destroy();

    // TODO: if room is empty, delete that as well

    res.json({status: 200})
})

module.exports = router;