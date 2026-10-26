const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.getAllProfiles);
router.post('/', profileController.createProfile);
router.post('/switch', profileController.switchProfile);
router.get('/:id/streak', profileController.getProfileStreak);

module.exports = router;
