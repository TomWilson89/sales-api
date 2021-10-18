import { Request, Response } from 'express';
import CreateOrderService from '../../../services/CreateOrderService';
import ShowOrderService from '../../../services/ShowOrderService';

class OrdersControllerClass {
  public async show(req: Request, res: Response): Promise<Response> {
    const { orderId } = req.params;
    const order = await new ShowOrderService().execute({ id: orderId });

    return res.json({ data: order });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const order = await new CreateOrderService().execute({
      customer_id,
      products,
    });

    return res.json({ data: order });
  }
}

const OrdersController = new OrdersControllerClass();

export default OrdersController;
