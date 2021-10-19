import { celebrate, Joi, Segments } from 'celebrate';

class ProfileValidationClass {
  public update = celebrate({
    [Segments.BODY]: {
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().optional(),
      old_password: Joi.string(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  });
}

const ProfileValidation = new ProfileValidationClass();

export default ProfileValidation;
