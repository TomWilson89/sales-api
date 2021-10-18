import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

class SessionsControlerClass {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const token = await new CreateSessionService().execute({
      email,
      password,
    });

    return res.json({ data: token });
  }
}

const SessionControler = new SessionsControlerClass();

export default SessionControler;
