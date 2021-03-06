'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Profile extends Sequelize.Model {}
  Profile.init({
      image: Sequelize.STRING,
      listening_to: {
        type: Sequelize.STRING,
        allowNull: true
      }
  }, { sequelize });

  Profile.associate = (models) => {
    Profile.belongsTo(models.Room, { foreignKey: 'room_id' })

    Profile.belongsTo(models.User, { foreignKey: 'user_id' })
  }

  return Profile;
};