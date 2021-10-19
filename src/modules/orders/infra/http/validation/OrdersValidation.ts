import { celebrate, Joi, Segments } from 'celebrate';

class OrderValidationClass {
  public params = celebrate({
    [Segments.PARAMS]: {
      orderId: Joi.string().uuid().required(),
    },
  });

  public create = celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  });
}

const OrderValidation = new OrderValidationClass();

export default OrderValidation;
