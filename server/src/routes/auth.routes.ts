import { Router } from 'express';
import * as authController from '../controllers/auth.controller'
import { loginValidator, formValidatorsMiddleware } from '../utils/validators';
const router = Router();

router.post('/login', loginValidator, formValidatorsMiddleware, authController.login);

export default router;
