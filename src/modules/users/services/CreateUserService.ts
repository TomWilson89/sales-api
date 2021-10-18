import AppError from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, name, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User Already exists', 422);
    }

    const user = usersRepository.create({ name, email, password });

    user.password = await bcrypt.hash(password, 12);

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
