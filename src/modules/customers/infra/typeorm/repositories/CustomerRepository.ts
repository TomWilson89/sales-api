import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

export class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public create({ email, name }: ICreateCustomer): Customer {
    const customer = this.ormRepository.create({ email, name });
    // await this.ormRepository.save(customer);
    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);
    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async findAll(): Promise<Customer[] | undefined> {
    const customers = await this.ormRepository.find();

    return customers;
  }

  public async findAllPaginate(): Promise<ICustomerPaginate> {
    const customers = await this.ormRepository.createQueryBuilder().paginate();

    return customers as ICustomerPaginate;
  }
}
