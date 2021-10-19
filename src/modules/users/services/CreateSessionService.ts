import config from '@config/auth';
import AppError from '@shared/errors/AppError';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { ICreateSession } from '../domain/models/ICreateSession';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSession): Promise<IUserAuthenticated> {
    // const usersRepository = await getCustomRepository(UserRepository);

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid Credentials', 401);
    }

    const verify = await this.hashProvider.compareHash(password, user.password);

    if (!verify) {
      throw new AppError('Invalid Credentials', 401);
    }

    const token = jwt.sign({ id: user.id }, config.jwt.secret as string, {
      subject: user.id,
      expiresIn: config.jwt.expiresIn,
    });

    return { token, user };
  }
}

export default CreateSessionService;
