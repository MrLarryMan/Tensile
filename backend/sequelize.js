const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '/data/database.sqlite'), // Adjust the path as needed
  logging: console.log, // Enable logging for debugging
});

module.exports = sequelize;