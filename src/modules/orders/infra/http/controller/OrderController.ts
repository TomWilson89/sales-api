import ListOrderService from '@modules/orders/services/ListOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../../../services/CreateOrderService';
import ShowOrderService from '../../../services/ShowOrderService';

class OrdersControllerClass {
  public async index(request: Request, response: Response): Promise<Response> {
    const orders = await container.resolve(ListOrderService).execute();

    return response.json(orders);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { orderId } = req.params;
    const order = await container
      .resolve(ShowOrderService)
      .execute({ id: orderId });

    return res.json({ data: order });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const order = await container.resolve(CreateOrderService).execute({
      customer_id,
      products,
    });

    return res.json({ data: order });
  }
}

const OrdersController = new OrdersControllerClass();

export default OrdersController;
