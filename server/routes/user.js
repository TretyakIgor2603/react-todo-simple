import * as userController from '../controllers/user';
import withAuth from '../middleware/auth-middleware';
import withRole from '../middleware/role-middleware';
import Router from 'express-promise-router';
import { userRoles } from '../utils/user-roles'
const router = Router();

router.get('/users/', withAuth, userController.getAll);
router.get('/users/roles/', withAuth, userController.getUserRoles);
// router.get('/users/', withAuth, withRole(userRoles.Admin), userController.getAll);
router.get('/users/:id', withAuth, userController.getById);
router.delete('/users/:id', withAuth, userController.deleteById);

export default router;
