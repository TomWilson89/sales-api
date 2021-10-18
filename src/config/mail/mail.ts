interface IMailConfig {
  driver: 'ETHEREAL' | 'SES';
  defaults: {
    from: {
      address: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ETHEREAL',
  defaults: {
    from: {
      address: 'contact@tomaswilson.me',
      name: 'Contact',
    },
  },
} as IMailConfig;
