import { Router } from 'express';
import moviesRouter from './features/movies/movies.router';

const indexRouter = Router();

indexRouter.use('/movies', moviesRouter);

export default indexRouter;
