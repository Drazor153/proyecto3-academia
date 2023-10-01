import { Router } from 'express';
import * as teachersControllers from '../controllers/teachers.controller';
import { postGradeValidator } from '../utils/validators';

const router = Router();

router.get('/levels/:run', teachersControllers.getTeacherLevels);

// Route for put a grade to a student
router.post('/grades', postGradeValidator, teachersControllers.postGrade);

export default router;
