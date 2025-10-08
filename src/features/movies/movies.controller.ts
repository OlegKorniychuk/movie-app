import { Request, Response, NextFunction } from 'express';
import moviesService from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from '../../core/dtos/movie.dto';

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

    res.status(204);
  },

  updateOne: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = req.params.id!;
    const payload: UpdateMovieDto = req.body;
    const movie = await moviesService.update(id, payload);

    res.status(200).json({ data: movie });
  },

  importFile: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // const movies = await moviesService.createMany();
    const movies = ['uploadedMovie'];

    res.status(200).json({ data: movies });
  },
};

export default moviesController;
