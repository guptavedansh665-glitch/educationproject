const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/lesson/:lessonId', quizController.getQuizByLessonId);
router.post('/submit', quizController.submitQuiz);

module.exports = router;
