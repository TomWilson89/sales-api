import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  email: string;
  name: string;
}

class CreateCustomersService {
  public async execute({ email, name }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('Email already used', 422);
    }

    const customer = customersRepository.create({ name, email });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomersService;
