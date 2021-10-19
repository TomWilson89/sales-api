import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

class UserAvatarControlerClass {
  public async update(req: Request, res: Response): Promise<Response> {
    const user = await container.resolve(UpdateUserAvatarService).execute({
      user_id: req.user.id,
      avatarFilename: req.file?.filename as string,
    });

    return res.json(classToClass({ data: user }));
  }
}

const UserAvatarControler = new UserAvatarControlerClass();

export default UserAvatarControler;
