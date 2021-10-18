import { Router } from 'express';
import SessionControler from '../controller/SessionsController';
import SessionValidation from '../validation/SessionValidation';

const router = Router();

router.route('/').post(SessionValidation.create, SessionControler.create);

export default router;
