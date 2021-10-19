import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { v4 as uuidv4 } from 'uuid';
import { ICustomerPaginate } from '../../models/ICustomerPaginate';

export class FakeCustomersRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  public create({ email, name }: ICreateCustomer): Customer {
    const customer = new Customer();
    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;
    this.customers.push(customer);
    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    const customerIndex = this.customers.findIndex(c => c.id === customer.id);

    this.customers[customerIndex] = customer;

    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex(c => c.id === customer.id);
    this.customers.splice(customerIndex, 1);
  }

  public async findAll(): Promise<Customer[] | undefined> {
    return this.customers;
  }

  public async findAllPaginate(): Promise<ICustomerPaginate> {
    const res: ICustomerPaginate = {
      current_page: 1,
      data: this.customers,
      from: 0,
      next_page: null,
      prev_page: null,
      per_page: 15,
      to: 1,
      total: 1,
    };

    return res;
  }
}
