import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';
import { ICustomerPaginate } from '../models/ICustomerPaginate';

export interface ICustomerRepository {
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): ICustomer;
  save(data: ICustomer): Promise<ICustomer>;
  remove(data: ICustomer): Promise<void>;
  findAll(): Promise<ICustomer[] | undefined>;
  findAllPaginate(): Promise<ICustomerPaginate>;
}
