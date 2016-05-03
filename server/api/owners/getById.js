'use strict';
const Document = require('../../models/Document');
const HttpNotFound = require('../../errors').HttpNotFound;
const toOwnerJson = require('./toOwnerJson');
const User = require('../../models/User');

module.exports = (request, response, next) => {
  let documentCriteria = {
    attributes: ['id', 'ownerId'],
    where: {
      $and: [
        { ownerId: request.params.id },
        { published: true },
        { removed: false }
      ]
    }
  };
  return Document.findOne(documentCriteria)
    .then(document => {
      if (document) {
        return User.findById(document.ownerId);
      }
      // No document could be found with the given criteria. Throw an HttpNotFound
      // error and let the error handler deal with it.
      throw new HttpNotFound(`Unable to find owner with id ${request.params.id}.`);
    })
    .then(user => {
      return response.status(200).json({ owner: toOwnerJson(user) });
    })
    .catch(next);
};
