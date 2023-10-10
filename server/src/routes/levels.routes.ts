import { Router } from 'express';
import * as controller from '../controllers/levels.controller';
const router = Router();

router.get('/', controller.all);

export default router;
