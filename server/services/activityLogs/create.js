'use strict';

const ActivityLog = require('../../models').ActivityLog;
const executeQuery = require('../../data').executeQuery;

const sql = `INSERT INTO activity_logs (ref_type, ref_id, description, user_id, created_at)
             VALUES ($1::varchar, $2::integer, $3::varchar, $4::integer, $5::timestamp)
             RETURNING *;`;

module.exports = (activityLog) => {
  let params = [
    activityLog.refType,
    activityLog.refId,
    activityLog.description,
    activityLog.userId,
    new Date()
  ];
  return executeQuery(sql, params)
    .then(function (result) {
      return new ActivityLog(result.rows[0]);
    });
};
