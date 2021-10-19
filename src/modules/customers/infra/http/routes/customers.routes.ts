import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';
import CustomersController from '../controller/CustomerController';
import CustomerValidation from '../validations/CustomerValidation';

const router = Router();

router.use(isAuthenticated);

router
  .route('/')
  .get(CustomersController.index)
  .post(CustomerValidation.create, CustomersController.create);

router
  .route('/:customerId')
  .get(CustomersController.show)
  .put(CustomerValidation.update, CustomersController.update)
  .delete(CustomersController.delete);

router.param('customerId', CustomerValidation.params);

export default router;
