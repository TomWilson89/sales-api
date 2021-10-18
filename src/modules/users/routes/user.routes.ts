import upload from '@config/upload';
import { Router } from 'express';
import multer from 'multer';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarControler from '../controller/UsersAvatarController';
import UserControler from '../controller/UsersController';
import UserValidation from '../validation/UsersValidation';

const multerConfig = multer(upload);

const router = Router();

router
  .route('/')
  .get(isAuthenticated, UserControler.index)
  .post(UserValidation.create, UserControler.create);

router
  .route('/avatar')
  .patch(
    isAuthenticated,
    multerConfig.single('avatar'),
    UserAvatarControler.update,
  );

export default router;
