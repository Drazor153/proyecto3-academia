import { Router } from 'express';
import * as gradesController from "../controllers/grades.controller";
const router = Router();

router.get('/:run', gradesController.getStudentGrades)

export default router;
