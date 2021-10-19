import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import CreateSessionService from './CreateSessionService';

describe('Create User', () => {
  let user: ICreateUser;
  let fakeUserRepo: IUsersRepository;
  let createSession: CreateSessionService;
  let fakeHashProvider: IHashProvider;

  beforeAll(() => {
    user = {
      email: 'test@test.com',
      name: 'Test user',
      password: '123456',
    };
    fakeUserRepo = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionService(fakeUserRepo, fakeHashProvider);

    fakeUserRepo.create({
      ...user,
    });
  });

  it('should be able to authenticate', async () => {
    const response = await createSession.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
  });

  it('should not be able to authenticate if user does not exists', async () => {
    expect(
      createSession.execute({
        email: 'other.email@test.com',
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate if password is wrong', async () => {
    expect(
      createSession.execute({
        email: user.email,
        password: 'asdkljh',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
