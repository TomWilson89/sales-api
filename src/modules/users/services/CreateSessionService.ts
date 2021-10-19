import config from '@config/auth';
import AppError from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { ICreateSession } from '../domain/models/ICreateSession';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
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

    const verify = await bcrypt.compare(password, user.password);

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
