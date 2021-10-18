import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
@injectable()
class CreateCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}
  public async execute({ email, name }: ICreateCustomer): Promise<ICustomer> {
    // const customersRepository = getCustomRepository(CustomersRepository);

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('Email already used', 422);
    }

    const customer = this.customersRepository.create({ name, email });

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomersService;
