import { Request, Response, NextFunction } from 'express';
import { catchError } from '../../core/utils/catchError';
import { SignUpDto } from './dtos/sign-up.dto';
import { AppErrors } from '../../core/errors/errors';
import bcrypt from 'bcrypt';
import { usersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { jwtService } from '../auth/jwt.service';

export const usersController = {
  createOne: catchError(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const payload: SignUpDto = req.body;

      if (payload.password !== payload.confirmPassword)
        return next(new AppErrors.BadRequest('Passwords do not match'));

      const hashedPassword = await bcrypt.hash(payload.password, 12);
      const newUserData: CreateUserDto = {
        email: payload.email,
        name: payload.name,
        password: hashedPassword,
      };
      const newUser = await usersService.create(newUserData);
      const token = await jwtService.signAccessToken(newUser);

      res.status(200).json({ token, status: 1 });
    }
  ),
};
