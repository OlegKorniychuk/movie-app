import { Request, Response, NextFunction } from 'express';
import { AppErrors } from '../errors/errors';
import { jwtService } from '../../features/auth/jwt.service';
import { catchError } from '../utils/catchError';

export const protect = catchError(
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) return next(new AppErrors.Unathorized());

    const payload = jwtService.getPayload(token);

    next();
  }
);
