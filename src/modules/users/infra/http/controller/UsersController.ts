import ShowUserService from '@modules/users/services/ShowUserService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';

class UserControlerClass {
  public async index(req: Request, res: Response): Promise<Response> {
    let search = '';
    const sortField = String(req.query.sortField);

    if (req.query.search) {
      search = String(req.query.search);
    }

    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute(search, sortField);

    return res.json(classToClass(users));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ id });

    return res.json(user);
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
