import mailConfig from '@config/mail/mail';
import aws from 'aws-sdk';
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

export default class SESMail {
  static async sendMail({
    to,
    templateData,
    subject,
    from,
  }: ISendMail): Promise<void> {
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });

    const { address, name } = mailConfig.defaults.from;

    const message = await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || address,
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
  }
}
