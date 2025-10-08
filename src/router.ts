import { Router, Request, Response } from 'express';
import moviesRouter from './features/movies/movies.router';

const indexRouter = Router();

indexRouter.use('/movies', moviesRouter);
indexRouter.all('*any', (req: Request, res: Response) => {
  res.status(404).json({ message: 'This page does not exist' });
});

export default indexRouter;
