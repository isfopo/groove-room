'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Room extends Sequelize.Model {}
  Room.init({
    name: Sequelize.STRING,
    // add playlist array (string of spotify uri)
    skip_vote: Sequelize.NUMBER
  }, { sequelize });

  Room.associate = (models) => {
    Room.belongsToMany(models.User, {
      through: "user_room",
      as: "users",
      foreignKey: "user_id"
    });
  };

  return Room;
};