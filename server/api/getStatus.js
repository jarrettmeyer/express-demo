const getTimestamp = require('../utils/getTimestamp');

module.exports = function (req, res) {
  res.json({ status: 'server is up', timestamp: getTimestamp() });
};
