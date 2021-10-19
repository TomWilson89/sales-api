import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';

class ForgotPasswordControllerClass {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    await container.resolve(SendForgotPasswordEmailService).execute({
      email,
    });

    return res.status(204).json({ data: 'We have sent you an email' });
  }
}

const ForgotPasswordController = new ForgotPasswordControllerClass();

export default ForgotPasswordController;
