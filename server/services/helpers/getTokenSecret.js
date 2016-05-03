"use strict";

module.exports = () => {
  let tokenSecret = process.env.TOKEN_SECRET;
  if (tokenSecret) {
    return tokenSecret;
  }

  return 'this is a terrible token secret';
};
