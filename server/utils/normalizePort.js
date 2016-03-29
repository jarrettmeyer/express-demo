module.exports = function (value) {
  const i = parseInt(value, 10);
  if (isNaN(i)) {
    return value;
  }
  if (i > 0) {
    return i;
  }
  return false;
};
