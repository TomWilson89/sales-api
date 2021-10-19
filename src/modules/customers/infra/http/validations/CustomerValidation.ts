import { celebrate, Joi, Segments } from 'celebrate';

class CustomerValidationClass {
  public params = celebrate({
    [Segments.PARAMS]: {
      customerId: Joi.string().uuid().required(),
    },
  });

  public create = celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  });

  public update = celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string(),
    },
  });
}

const CustomerValidation = new CustomerValidationClass();

export default CustomerValidation;
