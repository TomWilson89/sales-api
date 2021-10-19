import AppError from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    name,
    old_password,
    password,
    user_id,
  }: IUpdateProfile): Promise<IUser> {
    // const usersRepository = getCustomRepository(UserRepository);

    const user = await this.usersRepository.findById(user_id);
    // const user = await usersRepository.findOne(user_Id, {
    //   select: ['password', 'id', 'email', 'name'],
    // });

    if (!user) {
      throw new AppError('User not found');
    }
    if (email && email !== user.email) {
      const userExists = await this.usersRepository.findByEmail(email);
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

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
