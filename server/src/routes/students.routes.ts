import { Router } from 'express';
import { formValidatorsMiddleware, studentRegisterValidator } from '../utils/validators';
import * as studentsController from '../controllers/students.controller';

const router = Router();

router.get('/', studentsController.get);
router.post('/', studentRegisterValidator, formValidatorsMiddleware, studentsController.create);

router.get('/levels/:run', studentsController.getLevels);
router.get('/classes/:lessonId/:run', studentsController.getClasses);
router.get('/grades/:year/:semester/:level/:run', studentsController.getStudentGrades);

export default router;
