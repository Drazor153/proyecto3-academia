import { Router } from 'express';
import * as controller from '../controllers/teachers.controller';
import {
  postClassValidator,
  postGradeValidator,
  putClassValidator,
} from '../utils/validators';
import { formValidatorsMiddleware } from '../services/formValidator';
import { cookieJwtAuth } from '../services/cookieJwtAuth';

const router = Router();

// GET
router.get('/levels/:run',
  cookieJwtAuth, 
  controller.getTeacherLessons);

router.get('/grades/:year/:semester/:level', controller.getLevelQuizzes);

router.get('/grades/quizzes/:quizId', controller.getQuizGrades);

router.get('/classes/:lessonId/students', controller.getStudents);

router.get('/classes/:lessonId', controller.getClasses);

// POST
router.post(
  '/grades/quizzes',
  // cookieJwtAuth,
  postGradeValidator,
  formValidatorsMiddleware,
  controller.postQuizzesGrades
);
router.post(
  '/classes',
  // cookieJwtAuth,
  postClassValidator,
  formValidatorsMiddleware,
  controller.createClass
);
router.put(
  '/classes/:classId',
  // cookieJwtAuth,
  putClassValidator,
  formValidatorsMiddleware,
  controller.updateClass
);
router.delete('/classes/:classId', 
  // cookieJwtAuth, 
  controller.deleteClass);

export default router;
