import { celebrate, Joi, Segments } from 'celebrate';

class ResetPasswordValidationClass {
  public create = celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      token: Joi.string().uuid().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  });
}

const ResetPasswordValidation = new ResetPasswordValidationClass();

export default ResetPasswordValidation;
