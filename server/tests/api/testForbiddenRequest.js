const getTokenForEmail = require('../getTokenForEmail');

module.exports = (request, method, url, email) => {
  var token = getTokenForEmail(email);
  return request()[method](url)
    .set('Authorization', token)
    .expect(403);
};
