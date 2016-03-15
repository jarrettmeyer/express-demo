'use strict';

const HttpNotFound = require('../../errors').HttpNotFound;
const users = require('../../services').users;

module.exports = (request, response, next) => {
  let id = request.params.id;
  return users.findOwnerById(id)
    .then(owner => {
      if (owner) {
        return response.status(200).json({ owner: owner });
      }
      return next(new HttpNotFound(`Unable to find owner with id ${id}.`));
    });
};
