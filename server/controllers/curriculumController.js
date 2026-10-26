const curriculumData = require('../data/curriculum.json');

exports.getGrades = (req, res) => {
  res.json({
    success: true,
    count: curriculumData.grades.length,
    data: curriculumData.grades
  });
};

exports.getSubjects = (req, res) => {
  res.json({
    success: true,
    count: curriculumData.subjects.length,
    data: curriculumData.subjects
  });
};

exports.getLessons = (req, res) => {
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
};

exports.getLessonById = (req, res) => {
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
};
