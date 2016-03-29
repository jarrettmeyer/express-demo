'use strict';

let dbm, seed, type;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('users', {
    id:               { type: 'serial', primaryKey: true },
    email:            { type: 'string', notNull: true, length: 255, unique: true },
    hashed_password:  { type: 'string', notNull: true, length: 255 },
    admin:            { type: 'boolean', defaultValue: false },
    removed:          { type: 'boolean', defaultValue: false },
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};
