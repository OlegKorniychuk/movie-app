import { Request, Response, NextFunction } from 'express';

const moviesController = {
  getMany: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const movies = ['movie1', 'movie2'];
    res.status(200).json({ data: movies });
  },

  getOne: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const movie = 'movie';

    res.status(200).json({ data: movie });
  },

  createOne: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const movie = 'movie';

    res.status(200).json({ data: movie });
  },

  deleteOne: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    res.status(204);
  },

  updateOne: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const movie = 'movie';

    res.status(200).json({ data: movie });
  },

  importFile: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const movies = ['movie1', 'movie2'];

    res.status(200).json({ data: movies });
  },
};

export default moviesController;
