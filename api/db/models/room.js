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
    name: Sequelize.DataTypes.STRING,
    playlist: { 
      type: Sequelize.DataTypes.STRING, 
      get: function() {
          return JSON.parse(this.getDataValue('playlist'));
      }, 
      set: function(val) {
          return this.setDataValue('playlist', JSON.stringify(val));
      },
    },
    skip_vote: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0
    }
  }, { sequelize });

  Room.associate = (models) => {
    Room.belongsToMany(models.Profile, { through: "profile_room" })
  }

  return Room;
};