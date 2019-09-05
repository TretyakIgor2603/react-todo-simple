import Router from 'express-promise-router';
import withAuth from '../middleware/auth-middleware';
import { createValidator } from '../middleware/validation-middleware';
import * as authController from '../controllers/auth';
import * as authSchemas from '../validation/authSchemas';

const router = Router();
const signInMiddleware = createValidator(authSchemas.signIn);
const signUpMiddleware = createValidator(authSchemas.signUp);
const signOutMiddleware = createValidator(authSchemas.signOut);
const emailExistMiddleware = createValidator(authSchemas.checkExistEmail);

router.post('/auth/login', signInMiddleware, authController.login);
router.post('/auth/register', signUpMiddleware, authController.register);
router.post('/auth/logout', signOutMiddleware, withAuth, authController.logout);
router.post('/auth/email-exist', emailExistMiddleware, authController.checkExistEmail);
router.post('/auth/refresh-token', authController.refreshToken);

export default router;
