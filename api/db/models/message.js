'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Message extends Sequelize.Model {}
  Message.init({
      content: {
        type: Sequelize.STRING,
        allowNull: false
      }
  }, { sequelize });

  Message.associate = (models) => {
    Message.belongsTo(models.Profile, { foreignKey: 'profile_id' })
  }

  return Message;
};