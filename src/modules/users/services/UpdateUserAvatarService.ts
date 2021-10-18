import upload from '@config/upload';
import AppError from '@shared/errors/AppError';
import fs from 'fs';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  fileName: string;
  userId: string;
}

class UpdateUserAvatarService {
  public async execute({ fileName, userId }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 422);
    }

    if (user.avatar) {
      const filePath = path.join(upload.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(filePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(filePath);
      }
    }

    console.log(`fileName`, fileName);
    user.avatar = fileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
