import { celebrate, Joi, Segments } from 'celebrate';

class SessionValidationClass {
  public create = celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  });
}

const SessionValidation = new SessionValidationClass();

export default SessionValidation;
