const getTokenForEmail = require('./getTokenForEmail');

module.exports = (request, method, url, email) => {
  return getTokenForEmail(email)
    .then(token => {
      return request()[method](url)
       .set('Authorization', token)
       .expect(403);
    });
};
