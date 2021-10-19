import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    // const productsRepository = getCustomRepository(ProductRepository);

    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('Product Already exists', 422);
    }

    const product = this.productsRepository.create({ name, price, quantity });

    await redisCache.invalidate('sales-api-PRODUCT_LIST');

    await this.productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
