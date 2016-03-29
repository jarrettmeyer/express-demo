/* globals -Promise */
'use strict';

const Promise = require('bluebird');
const validation = require('../validation');

const rules = {
  ownerId: {
    required: true,
    minValue: 1
  },
  title: {
    required: true,
    typeof: 'string'
  },
  abstract: {
    typeof: 'string'
  }
};

module.exports = (document) => {
  return validation.validate(document, rules);
};
