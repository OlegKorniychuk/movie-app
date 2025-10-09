import { Router } from 'express';
import { moviesController } from './movies.controller';
import multer from 'multer';
import { MovieKeyMap, TxtMovieParser } from './utils/movieFileParser';
import { validateBody } from '../../core/middleware/validateBody';
import { validateCreateMovie, validateUpdateMovie } from './movie.validate';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const moviesRouter = Router();

const movieKeyMap: MovieKeyMap = {
  Title: 'title',
  'Release Year': 'releaseYear',
  Format: 'format',
  Stars: 'actors',
};

moviesRouter
  .route('/import')
  .post(
    upload.single('movies'),
    moviesController.importFile(new TxtMovieParser(movieKeyMap))
  );

moviesRouter
  .route('/:id')
  .get(moviesController.getOne)
  .patch(validateBody(validateUpdateMovie), moviesController.updateOne)
  .delete(moviesController.deleteOne);

moviesRouter
  .route('/')
  .get(moviesController.getMany)
  .post(validateBody(validateCreateMovie), moviesController.createOne);

export default moviesRouter;
