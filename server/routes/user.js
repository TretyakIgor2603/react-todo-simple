import * as userController from '../controllers/user';
import withAuth from '../middleware/auth-middleware';
import withRole from '../middleware/role-middleware';
import Router from 'express-promise-router';
import { userRoles } from '../utils/user-roles'
const router = Router();

router.get('/users/roles/', userController.getUserRoles);
router.get('/users/', withAuth, withRole([userRoles.Admin]), userController.getAll);
router.get('/users/:id', withAuth, withRole([userRoles.Admin]), userController.getById);
router.put('/users/:id', withAuth, withRole([userRoles.Admin]), userController.updateById);
router.delete('/users/:id', withAuth, withRole([userRoles.Admin]), userController.deleteById);

export default router;
