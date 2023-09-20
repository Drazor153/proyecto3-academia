import { Router } from 'express';
import * as studentsController from '../controllers/students.controller';

const router = Router();

router.get('/ping', studentsController.ping);
router.get('/all', studentsController.all)
router.post('/create', studentsController.create);

export default router;
