const express = require('express');
const router = express.Router();
const quizzesData = require('../data/quizzes.json');

// GET /api/quizzes/lesson/:lessonId
router.get('/lesson/:lessonId', (req, res) => {
  const { lessonId } = req.params;
  const quiz = quizzesData.quizzes.find(q => q.lessonId === lessonId);

  if (!quiz) {
    return res.status(404).json({
      success: false,
      message: `No quiz found for lesson '${lessonId}'.`
    });
  }

  // Sanitize: strip out `isCorrect` before sending to student client
  const clientQuestions = quiz.questions.map(q => ({
    questionId: q.questionId,
    promptPa: q.promptPa,
    promptEn: q.promptEn,
    voicePromptUrl: q.voicePromptUrl,
    options: q.options.map(opt => ({ id: opt.id, textPa: opt.textPa }))
  }));

  res.json({
    success: true,
    data: {
      id: quiz.id,
      lessonId: quiz.lessonId,
      titlePa: quiz.titlePa,
      titleEn: quiz.titleEn,
      questions: clientQuestions
    }
  });
});

// POST /api/quizzes/submit
router.post('/submit', (req, res) => {
  const { quizId, studentId, answers } = req.body;

  if (!quizId || !studentId || !Array.isArray(answers)) {
    return res.status(400).json({
      success: false,
      message: 'quizId, studentId, and answers array are required.'
    });
  }

  const quiz = quizzesData.quizzes.find(q => q.id === quizId);
  if (!quiz) {
    return res.status(404).json({ success: false, message: 'Quiz not found.' });
  }

  let correctCount = 0;
  const evaluation = quiz.questions.map(question => {
    const studentAnswer = answers.find(a => a.questionId === question.questionId);
    const correctOption = question.options.find(opt => opt.isCorrect);
    const isCorrect = studentAnswer && studentAnswer.selectedOptionId === correctOption.id;

    if (isCorrect) correctCount++;

    return {
      questionId: question.questionId,
      selectedOptionId: studentAnswer ? studentAnswer.selectedOptionId : null,
      correctOptionId: correctOption.id,
      isCorrect,
      competencyTag: question.competencyTag
    };
  });

  const percentage = Math.round((correctCount / quiz.questions.length) * 100);

  res.json({
    success: true,
    message: 'Quiz evaluated successfully.',
    data: {
      studentId,
      quizId,
      score: `${correctCount}/${quiz.questions.length}`,
      percentage,
      passed: percentage >= 60,
      evaluation,
      praisePa: percentage >= 80 ? 'ਸ਼ਾਬਾਸ਼! ਬਹੁਤ ਵਧੀਆ ਪ੍ਰਦਰਸ਼ਨ!' : 'ਕੋਈ ਗੱਲ ਨਹੀਂ, ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।'
    }
  });
});

module.exports = router;
