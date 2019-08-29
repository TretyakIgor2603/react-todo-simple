import * as userController from '../controllers/user';
import withAuth from '../middleware/auth';
import withRole from '../middleware/check-role';
import Router from 'express-promise-router';
import { userRoles } from '../utils/roles'
const router = Router();

router.get('/users/', withAuth, withRole(userRoles.Admin), userController.getAll);
router.get('/users/:id', withAuth, userController.getById);

export default router;
