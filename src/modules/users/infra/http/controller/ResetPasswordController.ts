import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '../../../services/ResetPasswordService';

class ResetPasswordControllerClass {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;

    await container.resolve(ResetPasswordService).execute({
      token,
      password,
    });

    return res.status(204).json({ data: 'Password reseted' });
  }
}

const ResetPasswordController = new ResetPasswordControllerClass();

export default ResetPasswordController;
