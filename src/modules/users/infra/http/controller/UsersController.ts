import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';

class UserControlerClass {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await container.resolve(ListUserService).execute();

    return res.json(classToClass({ data: users }));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const user = await container.resolve(CreateUserService).execute({
      email,
      name,
      password,
    });

    return res.json(classToClass({ data: user }));
  }
}

const UserControler = new UserControlerClass();

export default UserControler;
