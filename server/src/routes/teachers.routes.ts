import { Router } from 'express';
import * as teachersControllers from '../controllers/teachers.controller';
import { postGradeValidator } from '../utils/validators';

const router = Router();

router.get('/levels/:run', teachersControllers.getTeacherLessons);
router.get(
  '/grades/:year/:semester/:level',
  teachersControllers.getLevelQuizzes
);

router.get('/grades/quizzes/:quizId', teachersControllers.getQuizGrades);
router.post(
  '/grades/quizzes',
  postGradeValidator,
  teachersControllers.postQuizzesGrades
);
router.get('/classes/:lessonId', teachersControllers.getClasses)
router.post('/classes', teachersControllers.createClass)

export default router;
