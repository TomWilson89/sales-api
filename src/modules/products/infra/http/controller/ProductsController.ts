import { Request, Response } from 'express';
import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import ListProductService from '../../../services/ListProductService';
import ShowProductService from '../../../services/ShowProductService';
import UpdateProductService from '../../../services/UpdateProductService';

class ProductsControllerClass {
  public async index(req: Request, res: Response): Promise<Response> {
    const products = await new ListProductService().execute();

    return res.json({ data: products });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { productId } = req.params;
    const product = await new ShowProductService().execute({ id: productId });

    return res.json({ data: product });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const product = await new CreateProductService().execute({
      name,
      price,
      quantity,
    });

    return res.json({ data: product });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { productId } = req.params;

    const product = await new UpdateProductService().execute({
      id: productId,
      name,
      price,
      quantity,
    });

    return res.json({ data: product });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { productId } = req.params;

    await new DeleteProductService().execute({
      id: productId,
    });

    return res.json({ data: 'Deleted Successfull' });
  }
}

const ProductsController = new ProductsControllerClass();

export default ProductsController;
