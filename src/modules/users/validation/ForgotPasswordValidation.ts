import { celebrate, Joi, Segments } from 'celebrate';

class ForgotPasswordValidationClass {
  public create = celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  });
}

const ForgotPasswordValidation = new ForgotPasswordValidationClass();

export default ForgotPasswordValidation;
