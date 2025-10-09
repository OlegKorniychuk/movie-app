import { Router } from 'express';
import { authController } from './auth.controller';
import { validateBody } from '../../core/middleware/validateBody';
import { validateLogin } from './auth.validate';

const authRouter = Router();

authRouter.route('/').post(validateBody(validateLogin), authController.login);

export default authRouter;
