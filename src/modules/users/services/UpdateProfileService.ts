import AppError from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_Id: string;
  name?: string;
  email?: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_Id,
    email,
    name,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(user_Id);
    // const user = await usersRepository.findOne(user_Id, {
    //   select: ['password', 'id', 'email', 'name'],
    // });

    if (!user) {
      throw new AppError('User not found');
    }
    if (email && email !== user.email) {
      const userExists = await usersRepository.findByEmail(email);
      if (userExists) {
        throw new AppError('Email already in use');
      }
      user.email = email || user.email;
    }

    user.name = name || user.name;

    if (password) {
      if (!old_password) {
        throw new AppError('Old password is required');
      }

      const verify = await bcrypt.compare(old_password, user.password);

      if (!verify) {
        throw new AppError('Inavlid password');
      }

      user.password = await bcrypt.hash(password, 12);
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
