'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Room extends Sequelize.Model {}
  Room.init({
    id: {
      type: Sequelize.DataTypes.UUID, 
      defaultValue: Sequelize.DataTypes.UUIDV1,
      primaryKey: true
    },
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