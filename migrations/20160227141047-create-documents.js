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
  return db.createTable('documents', {
    id: { type: 'serial', primaryKey: true },
    owner_id: { type: 'integer', notNull: true },
    title: { type: 'varchar', length: 255 },
    abstract: { type: 'varchar', length: 2048 },
    path: { type: 'varchar', length: 255 },
    type: { type: 'varchar', length: 255 },
    published: { type: 'boolean', defaultValue: false},
    removed: { type: 'boolean', defaultValue: false }
  }, callback);
};

exports.down = function(db, callback) {
  return db.dropTable('documents', callback);
};
