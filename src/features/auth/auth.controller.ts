import { Request, Response, NextFunction } from 'express';
import { catchError } from '../../core/utils/catchError';
import { LoginDto } from './dto/login.dto';
import { usersService } from '../users/users.service';
import { AppErrors } from '../../core/errors/errors';
import { jwtService } from './jwt.service';
import bcrypt from 'bcrypt';

export const authController = {
  login: catchError(
    async (
      require: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const payload: LoginDto = require.body;

      const user = await usersService.findByEmail(payload.email);

      if (!user) return next(new AppErrors.Unathorized('Invalid email'));

      const isPasswordValid = await bcrypt.compare(
        payload.password,
        user.password
      );

      if (!isPasswordValid)
        return next(new AppErrors.Unathorized('Invalid password'));

      const token = jwtService.signAccessToken(user);

      res.status(200).json({ token, status: 1 });
    }
  ),
};
