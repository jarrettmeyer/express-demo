'use strict';

const isObject = require('./isObject');

function contains(list, element) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === element) {
      return true;
    }
  }
  return false;
}

function removeProperty(obj, blacklist) {
  blacklist = toArray(blacklist);
  let keys = Object.keys(obj);
  if (keys && keys.length > 0) {
    keys.forEach(key => {
      if (contains(blacklist, key)) {
        delete obj[key];
      }
      if (isObject(obj[key])) {
        removeProperty(obj[key], blacklist);
      }
    });
  }
  return obj;
}

function toArray(list) {
  if (Array.isArray(list)) {
    return list;
  }
  return [].concat(list);
}

module.exports = removeProperty;
