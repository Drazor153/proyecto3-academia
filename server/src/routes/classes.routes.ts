import { Router } from 'express';
import * as classesController from '../controllers/classes.controller';
const router = Router();

router.get('/teacher/:run', classesController.getTeacherClassgroups)
router.get('/:year/:level/:group', classesController.getLevelClasses);

export default router;
