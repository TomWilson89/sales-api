import { celebrate, Joi, Segments } from 'celebrate';

class ProductValidationClass {
  public params = celebrate({
    [Segments.PARAMS]: {
      productId: Joi.string().uuid().required(),
    },
  });

  public create = celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  });

  public update = celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      price: Joi.number().precision(2),
      quantity: Joi.number(),
    },
  });
}

const ProductValidation = new ProductValidationClass();

export default ProductValidation;
