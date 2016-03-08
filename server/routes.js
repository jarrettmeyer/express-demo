'use strict';

const api = require('./api');
const authenticateWithToken = require('./security/authenticateWithToken');
const express = require('express');
const requireAdmin = require('./security/requireAdmin');
const router = express.Router();

router.get('/api/status', api.getStatus);

router.post('/api/login', api.login);

router.get('/api/documents', authenticateWithToken, api.documents.getAll);
router.post('/api/documents', authenticateWithToken, api.documents.post);

router.get('/api/users', authenticateWithToken, requireAdmin, api.users.getAll);

module.exports = router;
