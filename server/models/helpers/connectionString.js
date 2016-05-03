'use strict';
const dbConfig = require('../../../database.json');


function buildConnectionString(nodeEnv) {
  const config = dbConfig[nodeEnv];
  const connString = `postgres://${config.user}:${config.password}@${config.host}/${config.database}`;
  return connString;
}

/**
 * Get the connection string from the system environment variable.
 */
function getConnectionStringFromEnvironment() {
  return process.env.CONNECTION_STRING;
}


function getNodeEnvFromEnvironment() {
  let nodeEnv = process.env.NODE_ENV;
  if (!nodeEnv) {
    nodeEnv = 'development';
  }
  nodeEnv = nodeEnv.toLowerCase();
  return nodeEnv;
}


function getConnectionString() {
  let connString = getConnectionStringFromEnvironment();
  if (connString) {
    return connString;
  }

  let nodeEnv = getNodeEnvFromEnvironment();
  connString = buildConnectionString(nodeEnv);
  return connString;
}


let connectionString = getConnectionString();
module.exports = connectionString;
