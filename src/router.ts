import { Router, Request, Response } from 'express';
import moviesRouter from './features/movies/movies.router';
import authRouter from './features/auth/auth.router';
import usersRouter from './features/users/users.router';

const indexRouter = Router();

indexRouter.use('/movies', moviesRouter);
indexRouter.use('/sessions', authRouter);
indexRouter.use('/users', usersRouter);

indexRouter.all('*any', (req: Request, res: Response) => {
  res.status(404).json({ message: 'This page does not exist' });
});

export default indexRouter;
