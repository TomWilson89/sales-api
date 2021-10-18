import nodemailer from 'nodemailer';
import EmailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    templateData,
    subject,
    from,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Sales API',
        address: from?.email || '<test.mail@example.com>',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      // text: body,
      html: await EmailTemplate.parser({
        file: templateData.file,
        variables: templateData.variables,
      }),
    });

    console.log(`message sent:  %s`, message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
