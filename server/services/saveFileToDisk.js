'use strict';
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const uuid = require('node-uuid').v4;

const root = 'userdata/documents';

module.exports = (data, user) => {
  let userId = (user.id || user).toString();
  let userDirectory = path.join(root, userId);
  return new Promise((resolve, reject) => {
    fs.mkdir(userDirectory, err => {
      if (err && err.code !== 'EEXIST') {
        return reject(err);
      }
      let userFile = path.join(userDirectory, uuid());
      fs.writeFile(userFile, data, err => {
        if (err) {
          return reject(err);
        }
        return resolve({ path: userFile });
      });
    });
  });
};
