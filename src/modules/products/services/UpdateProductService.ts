import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IProduct> {
    // const productsRepository = getCustomRepository(ProductRepository);

    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    let productExists: IProduct | undefined;

    if (product.name !== name) {
      productExists = await this.productsRepository.findByName(name);
    }

    if (productExists) {
      throw new AppError(`Name ${name} already taken`, 404);
    }

    await redisCache.invalidate('sales-api-PRODUCT_LIST');

    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
