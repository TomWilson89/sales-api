import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class DeleteCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    // const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found');
    }

    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomersService;
