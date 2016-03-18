const Promise = require('bluebird');

const validators = {
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
}

module.exports = (document) => {
  return Promise.resolve(document);
};
