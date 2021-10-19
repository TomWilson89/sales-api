import AppError from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, name, password }: ICreateUser): Promise<IUser> {
    // const usersRepository = getCustomRepository(UserRepository);

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User Already exists', 422);
    }

    const user = this.usersRepository.create({ name, email, password });

    user.password = await bcrypt.hash(password, 12);

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
