'use strict';

const ActivityLog = require('../../models').ActivityLog;
const executeQuery = require('../../data').executeQuery;

const sql = `INSERT INTO activity_logs (ref_type, ref_id, description, user_id, created_at)
             VALUES ($1::varchar, $2::integer, $3::varchar, $4::integer, $5::timestamp)
             RETURNING *;`;

module.exports = (activityLog, options) => {
  let params = [
    activityLog.refType,
    activityLog.refId,
    activityLog.description,
    activityLog.userId,
    new Date()
  ];

  // Under many circumstances, creating an activity log happens along with
  // another process. If a transaction option is given, then use the existing
  // transaction.
  if (options && options.transaction) {
    return options.transaction.query(sql, params)
      .then(results => {
        // Grab the last result.
        let row = results[results.length - 1].rows[0];
        return new ActivityLog(row);
      });
  }

  return executeQuery(sql, params)
    .then(function (result) {
      return new ActivityLog(result.rows[0]);
    });
};
