import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

class UserAvatarControlerClass {
  public async update(req: Request, res: Response): Promise<Response> {
    const user = await new UpdateUserAvatarService().execute({
      userId: req.user.id,
      fileName: req.file?.filename as string,
    });

    return res.json(classToClass({ data: user }));
  }
}

const UserAvatarControler = new UserAvatarControlerClass();

export default UserAvatarControler;
