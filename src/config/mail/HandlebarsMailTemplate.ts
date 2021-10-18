import fs from 'fs';
import hbs from 'handlebars';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

class EmailTemplateClass {
  public async parser({
    file,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const template = await fs.promises.readFile(file, { encoding: 'utf-8' });

    const parseTemplate = hbs.compile(template);

    return parseTemplate(variables);
  }
}

const EmailTemplate = new EmailTemplateClass();

export default EmailTemplate;
