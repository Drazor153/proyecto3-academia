import { Router } from 'express';
import { studentRegisterValidator } from '../utils/validators';
import * as studentsController from '../controllers/students.controller';

const router = Router();

router.get('/', studentsController.get);
router.post('/', studentRegisterValidator, studentsController.create);

router.get('/levels/:run', studentsController.getLevels);
router.get('/grades/:year/:semester/:level/:run', studentsController.getStudentGrades);

export default router;
