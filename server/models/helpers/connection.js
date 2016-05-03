'use strict';
const connectionString = require('./connectionString');
const Sequelize = require('Sequelize');

let sequelize = new Sequelize(connectionString, {
  // logging: false,
  timestamps: false
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
};
