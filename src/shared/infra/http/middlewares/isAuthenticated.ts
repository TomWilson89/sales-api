import config from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

interface ITokenPayload extends JwtPayload {
  id: string;
}

export default async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new AppError('Unauthorized', 403);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = jwt.verify(
      token,
      config.jwt.secret as string,
    ) as ITokenPayload;

    const user = await getRepository(User).findOne({
      where: { id: decode.id },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }
    req.user = user;

    next();
  } catch (error) {
    throw new AppError('Invalid Token');
  }
}
