'use strict';

const errors = require('../errors');
const services = require('../services');

module.exports = function (req, res) {
  let credentials = req.body;
  return services.authentication.checkCredentials(credentials)
    .then(services.authentication.createToken)
    .then((token) => {
      res.send({ token: token });
    })
    .catch(errors.InvalidCredentials, (error) => {
      res.status(401).send(error.message);
    });
};
