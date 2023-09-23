import { Router } from 'express';
import * as levelsController from '../controllers/levels.controller';
const router = Router();

router.get('/', levelsController.all);

export default router;
