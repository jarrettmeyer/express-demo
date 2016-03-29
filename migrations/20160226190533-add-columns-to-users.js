'use strict';

const async = require('async');

let dbm, seed, type;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  return async.series([
    db.addColumn.bind(db, 'users', 'display_name', { type: 'varchar', length: 255 }),
    db.addColumn.bind(db, 'users', 'token_issued_at', { type: 'timestamp' })
  ], callback);
};

exports.down = function(db, callback) {
  return async.series([
    db.removeColumn.bind(db, 'users', 'display_name'),
    db.removeColumn.bind(db, 'users', 'token_issued_at')
  ], callback);
};
