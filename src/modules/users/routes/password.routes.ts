import { Router } from 'express';
import ForgotPasswordController from '../controller/ForgotPasswordController';
import ResetPasswordController from '../controller/ResetPasswordController';
import ForgotPasswordValidation from '../validation/ForgotPasswordValidation';
import ResetPasswordValidation from '../validation/ResetPasswordValidation';

const router = Router();

router
  .route('/forgot')
  .post(ForgotPasswordValidation.create, ForgotPasswordController.create);

router
  .route('/reset')
  .post(ResetPasswordValidation.create, ResetPasswordController.create);

export default router;
