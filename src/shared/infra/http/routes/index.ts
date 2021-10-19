import CustomersRoutes from '@modules/customers/infra/http/routes/customers.routes';
import OrderRoutes from '@modules/orders/infra/http/routes/orders.routes';
import ProductRoutes from '@modules/products/infra/http/routes/products.routes';
import PasswordRoutes from '@modules/users/infra/http/routes/password.routes';
import ProfileRoutes from '@modules/users/infra/http/routes/profile.routes';
import SessionRoutes from '@modules/users/infra/http/routes/sessions.routes';
import UserRoutes from '@modules/users/infra/http/routes/user.routes';
import { Router } from 'express';

const router = Router();
router.use('/products', ProductRoutes);
router.use('/users', UserRoutes);
router.use('/sessions', SessionRoutes);
router.use('/passwords', PasswordRoutes);
router.use('/profiles', ProfileRoutes);
router.use('/customers', CustomersRoutes);
router.use('/orders', OrderRoutes);
export default router;
