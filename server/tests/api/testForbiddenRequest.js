const getTokenForEmail = require('./getTokenForEmail');

module.exports = (request, method, url, email) => {
  return request()[method](url)
    .set('Authorization', getTokenForEmail(email))
    .expect(403);
};
