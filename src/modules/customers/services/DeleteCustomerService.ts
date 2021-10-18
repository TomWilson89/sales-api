import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

class DeleteCustomersService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found');
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomersService;
