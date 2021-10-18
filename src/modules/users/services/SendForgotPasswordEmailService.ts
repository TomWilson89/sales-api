import EtherealMail from '@config/mail/EtherealMail';
import mailConfig from '@config/mail/mail';
import SESMail from '@config/mail/SESMail';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokenRepository } from '../typeorm/repositories/UsersTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid user', 401);
    }

    const token = await userTokensRepository.generateToken(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    if (mailConfig.driver === 'SES') {
      await SESMail.sendMail({
        to: {
          email: user.email,
          name: user.name,
        },
        subject: 'Reset Password Request',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token.token}`,
          },
        },
      });
      return;
    }
    await EtherealMail.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      subject: 'Reset Password Request',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token.token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
