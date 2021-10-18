import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
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

    if (uploadConfig.driver === 'S3') {
      if (user.avatar) {
        await S3StorageProvider.deleteFile(user.avatar);
      }

      const file = await S3StorageProvider.saveFile(fileName);
      user.avatar = file;
    } else {
      if (user.avatar) {
        await DiskStorageProvider.deleteFile(user.avatar);
      }

      const file = await DiskStorageProvider.saveFile(fileName);
      user.avatar = file;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
