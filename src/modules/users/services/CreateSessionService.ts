import config from '@config/auth';
import AppError from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';
interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<string> {
    const usersRepository = await getCustomRepository(UserRepository);

    const user = await usersRepository.findByEmail(email);

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

    return token;
  }
}

export default CreateSessionService;
