/* global -Promise */
'use strict';

const createPropertyError = require('./createPropertyError');
const Promise = require('bluebird');
const ValidationError = require('../../errors/ValidationError');
const _ = require('lodash');


function hasValue(value) {
  return value !== undefined && value !== null && value !== '';
}


function checkMinValueProperty(value, key, rules) {
  if (rules.minValue && hasValue(value) && value < rules.minValue) {
    return createPropertyError(value, key, rules, `cannot be less than ${rules.minValue}`);
  }
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


function checkProperty(value, key, rules) {
  let propertyErrors = [];
  propertyErrors.push(checkRequiredProperty(value, key, rules));
  propertyErrors.push(checkTypeofProperty(value, key, rules));
  propertyErrors.push(checkMinValueProperty(value, key, rules));
  return propertyErrors;
}


module.exports = {

  validate(model, rules) {
    return new Promise((resolve, reject) => {
      let propertyErrors = [];
      Object.keys(rules).forEach(key => {
        let value = model[key];
        propertyErrors.push(checkProperty(value, key, rules[key]));
      });
      // Flatten returns a new array. Remove mutates the original array.
      propertyErrors = _.flatten(propertyErrors);
      _.remove(propertyErrors, err => { return !err; });
      if (propertyErrors.length) {
        let validationError = new ValidationError();
        validationError.model = model;
        validationError.errors = propertyErrors;
        return reject(validationError);
      }
      return resolve(model);
    });
  }

};
