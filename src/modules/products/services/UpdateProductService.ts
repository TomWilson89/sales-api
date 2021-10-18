import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    let productExists: Product | undefined;

    if (product.name !== name) {
      productExists = await productsRepository.findByName(name);
    }

    if (productExists) {
      throw new AppError(`Name ${name} already taken`, 404);
    }

    await redisCache.invalidate('sales-api-PRODUCT_LIST');

    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
