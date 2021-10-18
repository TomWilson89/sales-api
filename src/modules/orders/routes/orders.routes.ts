import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import OrdersController from '../controller/OrderController';
import OrderValidation from '../validation/OrdersValidation';

const router = Router();

router.use(isAuthenticated);

router.route('/').post(OrderValidation.create, OrdersController.create);

router.route('/:orderId').get(OrdersController.show);

router.param('orderId', OrderValidation.params);

export default router;
