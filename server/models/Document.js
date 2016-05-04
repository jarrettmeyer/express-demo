'use strict';
const connection = require('./helpers/connection');
const findAllForUser = require('./finders/document_findAllForUser');
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
  title: { type: Sequelize.STRING, allowNull: false },
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

// Add custom filters.
findAllPublished(Document);
findAllForUser(Document);

module.exports = Document;
