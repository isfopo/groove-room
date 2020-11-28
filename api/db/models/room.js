'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Room extends Sequelize.Model {}
  Room.init({
    name: Sequelize.STRING,
    // add playlist array (string of spotify uri)
    skip_vote: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }, { sequelize });

  Room.associate = (models) => {
    Room.belongsToMany(models.Profile, { through: "profile_room" })
  }

  return Room;
};