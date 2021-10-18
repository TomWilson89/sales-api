import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomersService from '../../../services/CreateCustomerService';
import DeleteCustomersService from '../../../services/DeleteCustomerService';
import ListCustomersService from '../../../services/ListCustomerService';
import ShowCustomersService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

class CustomersControllerClass {
  public async index(req: Request, res: Response): Promise<Response> {
    const customers = await new ListCustomersService().execute();

    return res.json({ data: customers });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { customerId } = req.params;
    const customer = await new ShowCustomersService().execute({
      id: customerId,
    });

    return res.json({ data: customer });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const customer = await container.resolve(CreateCustomersService).execute({
      name,
      email,
    });

    return res.json({ data: customer });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { customerId } = req.params;

    const customer = await new UpdateCustomerService().execute({
      id: customerId,
      name,
      email,
    });

    return res.json({ data: customer });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { customerId } = req.params;

    await new DeleteCustomersService().execute({
      id: customerId,
    });

    return res.json({ data: 'Deleted Successfull' });
  }
}

const CustomersController = new CustomersControllerClass();

export default CustomersController;
