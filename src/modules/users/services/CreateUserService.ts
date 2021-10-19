import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, name, password }: ICreateUser): Promise<IUser> {
    // const usersRepository = getCustomRepository(UserRepository);

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User Already exists', 422);
    }

    const user = this.usersRepository.create({ name, email, password });

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
