import AppError from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';
import { isAfter } from 'date-fns';
import addHours from 'date-fns/addHours';
import { inject, injectable } from 'tsyringe';
import { IResetPassword } from '../domain/models/IResetPassword';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ password, token }: IResetPassword): Promise<void> {
    // const usersRepository = getCustomRepository(UserRepository);

    // const userTokensRepository = getCustomRepository(UserTokenRepository);

    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Invalid token');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Expired token');
    }

    user.password = await bcrypt.hash(password, 12);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
