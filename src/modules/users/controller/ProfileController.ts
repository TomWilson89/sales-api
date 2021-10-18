import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

class ProfileControllerClass {
  public async show(req: Request, res: Response): Promise<Response> {
    const user = await new ShowProfileService().execute({
      user_Id: req.user.id,
    });

    return res.json(classToClass({ data: user }));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password, old_password } = req.body;

    const user = await new UpdateProfileService().execute({
      email,
      name,
      password,
      user_Id: req.user.id,
      old_password,
    });

    return res.json(classToClass({ data: user }));
  }
}

const ProfileController = new ProfileControllerClass();

export default ProfileController;
