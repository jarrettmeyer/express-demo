'use strict';
const Document = require('../../models/Document');
const User = require('../../models/User');
const toOwnerJson = require('./helpers/toOwnerJson');
const _ = require('lodash');


let documentCriteria = {
  attributes: ['ownerId'],
  where: {
    $and: [
      { published: true },
      { removed: false }
    ]
  }
};


module.exports = (request, response) => {
  return Document.findAll(documentCriteria)
    .then(documents => {
      let ownerIds = documents.map(document => {
        return document.ownerId;
      });
      let userCriteria = {
        attributes: ['displayName', 'email', 'id'],
        where: {
          id: { $in: _.uniq(ownerIds) }
        }
      };
      return User.findAll(userCriteria);
    })
    .then(users => {
      return response.status(200).json({ owners: users.map(toOwnerJson) });
    });
};
