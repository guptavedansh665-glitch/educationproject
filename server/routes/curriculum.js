const express = require('express');
const router = express.Router();
const curriculumData = require('../data/curriculum.json');

// GET /api/curriculum/grades
router.get('/grades', (req, res) => {
  res.json({
    success: true,
    count: curriculumData.grades.length,
    data: curriculumData.grades
  });
});

// GET /api/curriculum/subjects
router.get('/subjects', (req, res) => {
  res.json({
    success: true,
    count: curriculumData.subjects.length,
    data: curriculumData.subjects
  });
});

// GET /api/curriculum/lessons
router.get('/lessons', (req, res) => {
  const { grade, subject } = req.query;
  let lessons = curriculumData.lessons;

  if (grade) {
    lessons = lessons.filter(l => l.grade === parseInt(grade, 10));
  }
  if (subject) {
    lessons = lessons.filter(l => l.subject.toLowerCase() === subject.toLowerCase());
  }

  res.json({
    success: true,
    count: lessons.length,
    data: lessons
  });
});

// GET /api/curriculum/lessons/:lessonId
router.get('/lessons/:lessonId', (req, res) => {
  const { lessonId } = req.params;
  const lesson = curriculumData.lessons.find(l => l.id === lessonId);

  if (!lesson) {
    return res.status(404).json({
      success: false,
      message: `Lesson with ID '${lessonId}' not found.`
    });
  }

  res.json({
    success: true,
    data: lesson
  });
});

module.exports = router;
