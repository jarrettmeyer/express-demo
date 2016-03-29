/* global -Promise */
'use strict';

const Promise = require('bluebird');
const ValidationError = require('../../errors/ValidationError');
const _ = require('lodash');

module.exports = {

  validate(model, rules) {
    return new Promise((resolve, reject) => {
      let modelErrors = [];
      Object.keys(rules).forEach(key => {
        let value = model[key];
        modelErrors.push(checkProperty(value, key, rules[key]));
      });
      // Flatten returns a new array. Remove mutates the original array.
      modelErrors = _.flatten(modelErrors);
      _.remove(modelErrors, err => { return !err; });
      if (modelErrors.length) {
        let validationError = new ValidationError();
        validationError.model = model;
        validationError.errors = modelErrors;
        return reject(validationError);
      }
      return resolve(model);
    });
  }

};


function checkMinValueProperty(value, key, rules) {
  if (rules.minValue && hasValue(value) && value < rules.minValue) {
    return createPropertyError(value, key, rules, `cannot be less than ${rules.minValue}`);
  }
}


function checkProperty(value, key, rules) {
  let propertyErrors = [];
  propertyErrors.push(checkRequiredProperty(value, key, rules));
  propertyErrors.push(checkTypeofProperty(value, key, rules));
  propertyErrors.push(checkMinValueProperty(value, key, rules));
  return propertyErrors;
}

function checkRequiredProperty(value, key, rules) {
  if (rules.required && !hasValue(value)) {
    return createPropertyError(value, key, rules, 'is required');
  }
}

function checkTypeofProperty(value, key, rules) {
  if (rules.typeof && hasValue(value) && (typeof value !== rules.typeof)) {
    return createPropertyError(value, key, rules, `must be of type ${rules.typeof}`);
  }
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

function getErrorMessage(key, rules, message) {
  return `${getPropertyName(key, rules)} ${message}.`;
}

function getPropertyName(key, rules) {
  return rules.propertyName || key;
}

function hasValue(value) {
  return value !== undefined && value !== null && value !== '';
}
