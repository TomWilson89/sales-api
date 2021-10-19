import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowCustomer } from '../domain/models/IShowCustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

@injectable()
class ShowCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    // const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found');
    }

    return customer;
  }
}

export default ShowCustomersService;
