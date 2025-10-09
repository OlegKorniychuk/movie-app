import { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';
import { catchError } from '../utils/catchError';
import { AppErrors } from '../errors/errors';

export const validateBody = (schema: ZodObject) =>
  catchError((req: Request, res: Response, next: NextFunction): void => {
    if (!req.body)
      return next(new AppErrors.BadRequest('Request body is empty'));

    const validate = schema.parse(req.body);
    req.body = validate;
    return next();
  });
