import AppError from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';
import { isAfter } from 'date-fns';
import addHours from 'date-fns/addHours';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokenRepository } from '../typeorm/repositories/UsersTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ password, token }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);

    const userTokensRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Invalid token');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Expired token');
    }

    user.password = await bcrypt.hash(password, 12);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
