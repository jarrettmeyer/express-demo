'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const handleErrors = require('./utils/handleErrors');
const logRequests = require('./utils/logRequests');
const pageNotFound = require('./utils/pageNotFound');
const routes = require('./routes');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logRequests());
app.use('/', routes);
app.use(pageNotFound);
app.use(handleErrors);

module.exports = app;
