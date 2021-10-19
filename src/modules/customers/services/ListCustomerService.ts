import { inject, injectable } from 'tsyringe';
import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';

// interface IPaginateCustomer {
//   from: number;
//   to: number;
//   per_page: number;
//   total: number;
//   current_page: number;
//   prev_page: number | null;
//   next_page: number | null;
//   data: Customer[];
// }
@injectable()
class ListCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}
  public async execute(): Promise<ICustomerPaginate> {
    // const customersRepository = getCustomRepository(CustomersRepository);

    // const customers = await customersRepository.createQueryBuilder().paginate();
    const customers = await this.customersRepository.findAllPaginate();

    return customers;
  }
}

export default ListCustomersService;
