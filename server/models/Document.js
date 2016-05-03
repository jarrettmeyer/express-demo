'use strict';
const connection = require('./helpers/connection');
const findAllPublished = require('./finders/document_findAllPublished');
const Sequelize = connection.Sequelize;
const sequelize = connection.sequelize;
const User = require('./User');

const Document = sequelize.define('document', {
  ownerId: {
    type: Sequelize.INTEGER,
    field: 'owner_id',
    references: {
      model: User,
      key: 'id'
    }
  },
  title: { type: Sequelize.STRING },
  abstract: { type: Sequelize.TEXT },
  originalFilename: { type: Sequelize.STRING, field: 'original_filename' },
  type: { type: Sequelize.STRING },
  path: { type: Sequelize.STRING },
  published: { type: Sequelize.BOOLEAN, defaultValue: false },
  removed: { type: Sequelize.BOOLEAN, defaultValue: false }
}, {
  tableName: 'documents',
  timestamps: false
});

findAllPublished(Document);

module.exports = Document;
