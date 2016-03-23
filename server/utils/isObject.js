function isNotArray(value) {
  return !Array.isArray(value);
}


function isNotNull(value) {
  return value !== null;
}


function isObject(value) {
  return (typeof value === 'object') && isNotNull(value) && isNotArray(value);
}


module.exports = isObject;
