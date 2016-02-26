'use strict';

var dbm;
var type;
var seed;

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
  return db.createTable('activity_logs', {
    id: { type: 'serial', primaryKey: true },
    ref_type: { type: 'varchar', notNull: true, length: 255 },
    ref_id: { type: 'integer', notNull: true },
    description: { type: 'varchar', length: 2000 },
    user_id: { type: 'integer' },
    created_at: { type: 'timestamp' }
  }, callback);
};

exports.down = function(db, callback) {
  return db.dropTable('activity_logs', callback);
};
