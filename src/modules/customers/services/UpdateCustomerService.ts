import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({
    id,
    email,
    name,
  }: IUpdateCustomer): Promise<Customer> {
    // const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found');
    }
    if (email && email !== customer.email) {
      const customertExists = await this.customersRepository.findByEmail(email);
      if (customertExists) {
        throw new AppError('Email already in use');
      }
      customer.email = email || customer.email;
    }

    customer.name = name || customer.name;

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
