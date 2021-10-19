import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import { inject, injectable } from 'tsyringe';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({
    avatarFilename,
    user_id,
  }: IUpdateUserAvatar): Promise<IUser> {
    // const usersRepository = getCustomRepository(UserRepository);

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 422);
    }

    if (uploadConfig.driver === 'S3') {
      if (user.avatar) {
        await S3StorageProvider.deleteFile(user.avatar);
      }

      const file = await S3StorageProvider.saveFile(avatarFilename);
      user.avatar = file;
    } else {
      if (user.avatar) {
        await DiskStorageProvider.deleteFile(user.avatar);
      }

      const file = await DiskStorageProvider.saveFile(avatarFilename);
      user.avatar = file;
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
