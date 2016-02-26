'use strict';

module.exports = (req, res, next) => {
  let user = req.user;
  if (user.admin) {
    return next();
  }
  return res.status(403).send('forbidden');
}
