'use strict';

const _ = require('lodash');

function getPropertyName(key, rules) {
  return rules.propertyName || key;
}

function getErrorMessage(key, rules, message) {
  return `${getPropertyName(key, rules)} ${message}.`;
}

function createPropertyError(value, key, rules, message, opts) {
  let error = {
    key: key,
    message: getErrorMessage(key, rules, message),
    value: value
  };
  _.assign(error, opts);
  return error;
}

module.exports = createPropertyError;
