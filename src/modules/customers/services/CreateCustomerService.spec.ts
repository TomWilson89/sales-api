import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { FakeCustomersRepository } from '../domain/repositories/fakes/FakeCustomersRepository';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import CreateCustomersService from './CreateCustomerService';

describe('Create Customer', () => {
  let customer: ICreateCustomer;

  let fakerCustomerRepo: ICustomerRepository;
  let createCustomer: CreateCustomersService;

  beforeAll(() => {
    customer = {
      name: 'John',
      email: 'test@gmail.com',
    };
    fakerCustomerRepo = new FakeCustomersRepository();
    createCustomer = new CreateCustomersService(fakerCustomerRepo);
  });

  it('should be able to create a new customer', async () => {
    const newCustomer = await createCustomer.execute({
      email: customer.email,
      name: customer.name,
    });

    expect(newCustomer).toHaveProperty('id');
    expect(newCustomer.email).toBe(customer.email);
    expect(newCustomer.name).toBe(customer.name);
  });

  it('should not be able to create a new customer if email is already in use', async () => {
    expect(
      createCustomer.execute({
        email: customer.email,
        name: customer.name,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
