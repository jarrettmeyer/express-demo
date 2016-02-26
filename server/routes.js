const api = require('./api')
const express = require('express');
const router = express.Router();

router.get('/api/status', api.getStatus);

router.post('/api/login', api.login);

module.exports = router;
