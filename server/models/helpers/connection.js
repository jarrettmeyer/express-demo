'use strict';
const connectionString = require('./connectionString');
const debug = require('debug')('sql');
const Sequelize = require('Sequelize');

let sequelize = new Sequelize(connectionString, {
  logging: function (msg) {
    msg = msg.replace(/^Executing \(default\)\: /, '');
    debug(msg);
  },
  timestamps: false
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
};
