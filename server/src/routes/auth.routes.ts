import { Router } from 'express';
import * as controller from '../controllers/auth.controller'
import { loginValidator } from '../utils/validators';
import { formValidatorsMiddleware } from '../services/formValidator';
// import { cookieJwtAuth } from '../services/cookieJwtAuth';
const router = Router();

router.post('/login', loginValidator, formValidatorsMiddleware, controller.login);
router.post('/logout', controller.logout);
// router.get('/test', cookieJwtAuth, controller.test);
export default router;
