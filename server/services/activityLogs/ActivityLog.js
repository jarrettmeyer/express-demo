'use strict';

class ActivityLog {
  constructor(spec) {
    spec = spec || {};
    this.id = spec.id;
    this.refType = spec.refType || spec.ref_type;
    this.refId = spec.refId || spec.ref_id;
    this.description = spec.description;
    this.userId = spec.userId || spec.user_id;
    this.createdAt = spec.createdAt || spec.created_at;
  }
}

module.exports = ActivityLog;
