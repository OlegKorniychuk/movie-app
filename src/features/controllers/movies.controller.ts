import { Request, Response, NextFunction } from 'express';

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movies = ['movie1', 'movie2'];
  res.status(200).json({ data: movies });
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movie = 'movie';

  res.status(200).json({ data: movie });
};

export const createOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movie = 'movie';

  res.status(200).json({ data: movie });
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res.status(204);
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movie = 'movie';

  res.status(200).json({ data: movie });
};

export const importFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movies = ['movie1', 'movie2'];

  res.status(200).json({ data: movies });
};
