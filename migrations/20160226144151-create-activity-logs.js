'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  return db.createTable('activity_logs', {
    id: { type: 'serial', primaryKey: true },
    ref_type: { type: 'varchar', length: 255 },
    ref_id: { type: 'integer' },
    description: { type: 'varchar', length: 2000 },
    user_id: { type: 'integer' },
    created_at: { type: 'timestamp' }
  }, callback);
};

exports.down = function(db, callback) {
  return db.dropTable('activity_logs', callback);
};
