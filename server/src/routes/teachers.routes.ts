import { Router } from 'express';
import * as controller from '../controllers/teachers.controller';
import {
  postClassValidator,
  postGradeValidator,
  putClassValidator,
} from '../utils/validators';
import { formValidatorsMiddleware } from '../services/formValidator';

const router = Router();

// GET
router.get('/levels/:run', controller.getTeacherLessons);

router.get(
  '/grades/:year/:semester/:level',
  controller.getLevelQuizzes
);

router.get('/grades/quizzes/:quizId', controller.getQuizGrades);

router.get('/classes/:lessonId/students', controller.getStudents);

router.get('/classes/:lessonId', controller.getClasses);

// POST
router.post(
  '/grades/quizzes',
  postGradeValidator,
  formValidatorsMiddleware,
  controller.postQuizzesGrades
);
router.post(
  '/classes',
  postClassValidator,
  formValidatorsMiddleware,
  controller.createClass
);
router.put(
  '/classes/:classId',
  putClassValidator,
  formValidatorsMiddleware,
  controller.updateClass
);
router.delete('/classes/:classId', controller.deleteClass);

export default router;
