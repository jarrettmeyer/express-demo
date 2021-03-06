'use strict';
const connection = require('./helpers/connection');
const findAllForDocument = require('./finders/activityLog/findAllForDocument');
const Sequelize = connection.Sequelize;
const sequelize = connection.sequelize;
const User = require('./User');


const ActivityLog = sequelize.define('activity_log', {
  refType: { type: Sequelize.STRING, field: 'ref_type' },
  refId: { type: Sequelize.INTEGER, field: 'ref_id' },
  description: { type: Sequelize.STRING, allowNull: false },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    references: {
      model: User,
      key: 'id'
    }
  },
  createdAt: { type: Sequelize.DATE, field: 'created_at', allowNull: false }
}, {
  tableName: 'activity_logs',
  timestamps: false
});


// Add custom filter.
findAllForDocument(ActivityLog);


module.exports = ActivityLog;
