import { Router } from 'express';
import * as studentsController from '../controllers/students.controller';

const router = Router();

router.get('/', studentsController.get);
router.post('/', studentsController.create);

router.get('/grades/:run', studentsController.getStudentGrades);

export default router;
