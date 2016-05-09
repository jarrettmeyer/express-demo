'use strict';
const connection = require('./helpers/connection');
const findOneByEmail = require('./finders/user/findOneByEmail');
const Sequelize = connection.Sequelize;
const sequelize = connection.sequelize;

const User = sequelize.define('user', {
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  displayName: {
    type: Sequelize.STRING,
    field: 'display_name',
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  hashedPassword: {
    type: Sequelize.STRING,
    field: 'hashed_password',
    allowNull: false
  },
  removed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  tokenIssuedAt: {
    type: Sequelize.DATE,
    field: 'token_issued_at'
  }
}, {
  tableName: 'users',
  timestamps: false
});

findOneByEmail(User);

module.exports = User;
