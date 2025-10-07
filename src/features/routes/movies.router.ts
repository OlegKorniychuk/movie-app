import { Router } from 'express';
import { moviesController } from '../controllers/index.controller';

const moviesRouter = Router();

moviesRouter.route('/import').post(moviesController.importFile);

moviesRouter
  .route('/:id')
  .get(moviesController.getOne)
  .patch(moviesController.updateOne)
  .delete(moviesController.deleteOne);

moviesRouter
  .route('/')
  .get(moviesController.getMany)
  .post(moviesController.createOne);

export default moviesRouter;
