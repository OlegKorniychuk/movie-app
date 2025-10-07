import { Router } from 'express';
import moviesRouter from './movies.router';

const indexRouter = Router();

indexRouter.use('/movies', moviesRouter);

export default indexRouter;
