'use strict';

const errors = require('../errors');
const services = require('../services');

module.exports = function (req, res) {
  let credentials = req.body;
  let now = new Date();
  let token = null;
  let user = null;
  return services.authentication.checkCredentials(credentials)
    .then((_user) => {
      user = _user;
      return services.authentication.createToken(user.email, { now: now });
    })
    .then((_token) => {
      token = _token;
      return services.users.updateTokenIssuedAt(user.id, now);
    })
    .then(() => {
      return res.send({ token: token });
    })
    .catch(errors.InvalidCredentials, (error) => {
      return res.status(401).send(error.message);
    });
};
