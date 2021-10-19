import { celebrate, Joi, Segments } from 'celebrate';

class UserValidationClass {
  public params = celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().uuid().required(),
    },
  });

  public create = celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  });

  public update = celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
    },
  });
}

const UserValidation = new UserValidationClass();

export default UserValidation;
