const request = require('supertest-as-promised');
const app = require('../../app');

module.exports = function () {
  return request(app);
};
