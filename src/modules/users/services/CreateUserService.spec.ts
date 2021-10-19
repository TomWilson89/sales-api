import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import CreateUserService from './CreateUserService';

describe('Create User', () => {
  let user: ICreateUser;
  let fakeUserRepo: IUsersRepository;
  let createUser: CreateUserService;
  let fakeHashProvider: IHashProvider;
  beforeAll(() => {
    user = {
      email: 'test@test.com',
      name: 'Test user',
      password: '123456',
    };
    fakeUserRepo = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepo, fakeHashProvider);
  });

  it('should be able to create new user', async () => {
    const newUser = await createUser.execute({
      email: user.email,
      name: user.name,
      password: user.password,
    });

    expect(newUser).toHaveProperty('id');
  });

  it('should not be able to create a new user if email is already in use', async () => {
    expect(
      createUser.execute({
        email: user.email,
        name: user.name,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
