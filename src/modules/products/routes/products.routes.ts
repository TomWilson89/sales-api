import { Router } from 'express';
import ProductsController from '../controller/ProductsController';
import ProductValidation from '../validation/ProductsValidation';

const router = Router();

router
  .route('/')
  .get(ProductsController.index)
  .post(ProductValidation.create, ProductsController.create);

router
  .route('/:productId')
  .get(ProductsController.show)
  .put(ProductValidation.update, ProductsController.update)
  .delete(ProductsController.delete);

router.param('productId', ProductValidation.params);

export default router;
