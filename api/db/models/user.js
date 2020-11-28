'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    name: Sequelize.STRING,
    image: Sequelize.STRING
  }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Profile, { foreignKey: 'user_id' })
  }

  return User;
};
