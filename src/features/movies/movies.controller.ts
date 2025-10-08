import { Request, Response, NextFunction } from 'express';
import moviesService from './movies.service';
import {
  CreateMovieDto,
  MovieResponseDto,
  UpdateMovieDto,
} from '../../core/dtos/movie.dto';
import { IMovieFileParser } from './utils/movieFileParser';

const moviesController = {
  getMany: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const movies = await moviesService.findMany();
    res.status(200).json({ data: movies });
  },

  getOne: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = req.params.id!;
    const movie = await moviesService.find(id);

    res.status(200).json({ data: movie });
  },

  createOne: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const payload: CreateMovieDto = req.body;
    const movie = await moviesService.create(payload);

    res.status(200).json({ data: movie });
  },

  deleteOne: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = req.params.id!;
    await moviesService.delete(id);

    res.status(200).json({ status: 1 });
  },

  updateOne: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = req.params.id!;
    const payload: UpdateMovieDto = req.body;
    const updatedCount = await moviesService.update(id, payload);

    if (!updatedCount) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }

    const updatedMovie = await moviesService.find(id);

    res.status(200).json({ data: updatedMovie });
  },

  importFile:
    (fileParser: IMovieFileParser) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        if (!req.file) {
          res.status(400).json({ error: 'File is required' });
          return;
        }

        const parseResult = fileParser.parse(req.file);
        if (parseResult.error) {
          res.status(400).json({ fileParsingError: parseResult.error });
          return;
        }

        const newMovies = await moviesService.createMany(parseResult.data!);

        res.status(200).json({ data: newMovies });
      } catch (err) {
        next(err);
      }
    },
};

export default moviesController;
