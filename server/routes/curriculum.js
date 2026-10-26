const express = require('express');
const router = express.Router();
const curriculumController = require('../controllers/curriculumController');

router.get('/grades', curriculumController.getGrades);
router.get('/subjects', curriculumController.getSubjects);
router.get('/lessons', curriculumController.getLessons);
router.get('/lessons/:lessonId', curriculumController.getLessonById);

module.exports = router;
