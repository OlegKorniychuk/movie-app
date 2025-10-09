import { User } from '../../core/models/user.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { v4 as uuidv4 } from 'uuid';

export const usersService = {
  create: async (payload: CreateUserDto): Promise<UserResponseDto> => {
    const newUser = await User.create({ id: uuidv4(), ...payload });

    return newUser.get({ plain: true });
  },

  findByEmail: async (email: string): Promise<UserResponseDto | null> => {
    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    return user.get({ plain: true });
  },
};
