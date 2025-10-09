import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appError';
import z, { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation error',
      details: z.prettifyError(err).replace(/\n/g, '').split('✖ ').slice(1),
    });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Unexpected server error' });
};
