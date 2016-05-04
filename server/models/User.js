'use strict';
const connection = require('./helpers/connection');
const findOneByEmail = require('./finders/user_findOneByEmail');
const Sequelize = connection.Sequelize;
const sequelize = connection.sequelize;

const User = sequelize.define('user', {
  displayName: { type: Sequelize.STRING, field: 'display_name' },
  email: { type: Sequelize.STRING, allowNull: false, notNull: true, isEmail: true },
  hashedPassword: { type: Sequelize.STRING, field: 'hashed_password', allowNull: false },
  admin: { type: Sequelize.BOOLEAN, defaultValue: false },
  removed: { type: Sequelize.BOOLEAN, defaultValue: false },
  tokenIssuedAt: { type: Sequelize.DATE, field: 'token_issued_at' }
}, {
  tableName: 'users',
  timestamps: false
});

findOneByEmail(User);

module.exports = User;
