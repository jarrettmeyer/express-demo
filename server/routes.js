'use strict';

const api = require('./api');
const authenticateWithToken = require('./security/authenticateWithToken');
const express = require('express');
const multer = require('multer');
const requireAdmin = require('./security/requireAdmin');
const requireDocumentOwnership = require('./security/requireDocumentOwnership');

const router = express.Router();
const upload = multer();

router.get('/', api.getRoot);
router.get('/api/status', api.getStatus);

router.post('/api/login', api.login);

router.get('/api/documents', authenticateWithToken, api.documents.getAll);
router.get('/api/documents/:id', authenticateWithToken, api.documents.getById);
router.post('/api/documents', authenticateWithToken, api.documents.post);
router.put('/api/documents/:id', authenticateWithToken, requireDocumentOwnership, api.documents.put);
router.get('/api/documents/:id/file', authenticateWithToken, api.documents.getFile);
router.post('/api/documents/:id/file', authenticateWithToken, requireDocumentOwnership, upload.single('attachment'), api.documents.postFile);
router.delete('/api/documents/:id', authenticateWithToken, requireDocumentOwnership, api.documents.delete);

router.get('/api/owners', authenticateWithToken, api.owners.getAll);
router.get('/api/owners/:id', authenticateWithToken, api.owners.getById);

router.get('/api/users', authenticateWithToken, requireAdmin, api.users.getAll);

module.exports = router;
