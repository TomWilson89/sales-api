import EtherealMail from '@config/mail/EtherealMail';
import mailConfig from '@config/mail/mail';
import SESMail from '@config/mail/SESMail';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { ISendForgotPasswordEmail } from '../domain/models/ISendforgotPasswordEmail';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
    // const usersRepository = getCustomRepository(UserRepository);
    // const userTokensRepository = getCustomRepository(UserTokenRepository);

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid user', 401);
    }

    const token = await this.userTokensRepository.generate(user.id);

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
