const express = require('express');
const router = express.Router();
const syncController = require('../controllers/syncController');

router.get('/status', syncController.getSyncStatus);
router.post('/batch', syncController.batchSync);

module.exports = router;
