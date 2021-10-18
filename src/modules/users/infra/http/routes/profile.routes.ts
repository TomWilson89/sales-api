import { Router } from 'express';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';
import ProfileController from '../controller/ProfileController';
import ProfileValidation from '../validation/ProfileValidation';

const router = Router();

router.use(isAuthenticated);

router
  .route('/')
  .get(ProfileController.show)
  .put(ProfileValidation.update, ProfileController.update);

export default router;
