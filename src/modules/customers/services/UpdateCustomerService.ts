import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
}

class UpdateCustomerService {
  public async execute({ id, email, name }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found');
    }
    if (email && email !== customer.email) {
      const customertExists = await customersRepository.findByEmail(email);
      if (customertExists) {
        throw new AppError('Email already in use');
      }
      customer.email = email || customer.email;
    }

    customer.name = name || customer.name;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
