/* globals -Promise */
const Promise = require('bluebird');

module.exports = (user) => {
  return Promise.resolve(user);
};
