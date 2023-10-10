import { Router } from 'express';
import { studentRegisterValidator } from '../utils/validators';
import * as controller from '../controllers/students.controller';
import { formValidatorsMiddleware } from '../services/formValidator';

const router = Router();

// GET
router.get('/', controller.get);
router.get('/levels/:run', controller.getLevels);
router.get('/classes/:lessonId/:run', controller.getClasses);
router.get('/grades/:year/:semester/:level/:run', controller.getStudentGrades);

// POST
router.post('/', studentRegisterValidator, formValidatorsMiddleware, controller.create);

export default router;
