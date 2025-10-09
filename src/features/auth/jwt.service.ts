import jwt from 'jsonwebtoken';
import { UserResponseDto } from '../users/dtos/user-response.dto';

export const jwtService = {
  signAccessToken: (user: UserResponseDto): string => {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!secret) throw new Error('Access token secret is missing');

    return jwt.sign(payload, secret);
  },

  getPayload: (token: string) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!secret) throw new Error('Access token secret is missing');

    return jwt.verify(token, secret);
  },
};
