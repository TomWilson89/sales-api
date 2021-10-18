import CustomersRoutes from '@modules/customers/routes/customers.routes';
import OrderRoutes from '@modules/orders/routes/orders.routes';
import ProductRoutes from '@modules/products/routes/products.routes';
import PasswordRoutes from '@modules/users/routes/password.routes';
import ProfileRoutes from '@modules/users/routes/profile.routes';
import SessionRoutes from '@modules/users/routes/sessions.routes';
import UserRoutes from '@modules/users/routes/user.routes';
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
