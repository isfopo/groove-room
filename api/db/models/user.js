'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    name: Sequelize.STRING,
    image: Sequelize.STRING
  }, { sequelize });

  User.associate = (models) => {
    User.belongsToMany(models.Room, {
      through: "user_room",
      as: "rooms",
      foreignKey: "room_id"
    });
  };

  return User;
};
