import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

export class ProductRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const existtingProducts = await this.ormRepository.find({
      where: {
        id: In(productsIds),
      },
    });

    return existtingProducts;
  }

  public create({ name, price, quantity }: ICreateProduct): Product {
    const product = this.ormRepository.create({ price, name, quantity });

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);
    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne(id);

    return product;
  }

  public async findAll(): Promise<Product[]> {
    const products = this.ormRepository.find();

    return products;
  }

  public async findAllPaginate(): Promise<IProductPaginate> {
    const products = await this.ormRepository.createQueryBuilder().paginate();

    return products as IProductPaginate;
  }
}
