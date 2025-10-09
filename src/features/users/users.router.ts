import { Router } from 'express';
import { usersController } from './users.controller';
import { validateBody } from '../../core/middleware/validateBody';
import { validateCreateUser } from './users.validate';

const usersRouter = Router();

usersRouter
  .route('/')
  .post(validateBody(validateCreateUser), usersController.createOne);

export default usersRouter;
