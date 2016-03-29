function toArray(list) {
  if (Array.isArray(list)) {
    return list;
  }
  return [].concat(list);
}

module.exports = toArray;
