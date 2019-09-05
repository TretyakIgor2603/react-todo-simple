import * as todoController from '../controllers/todo';
import withAuth from '../middleware/auth-middleware';
import Router from 'express-promise-router';
import { createValidator } from '../middleware/validation-middleware';
import * as todoSchemas from '../validation/todoSchemas';

const router = Router();
const updateTaskMiddleware = createValidator(todoSchemas.updateTask);

router.get('/tasks/', withAuth, todoController.get);
router.post('/tasks/', withAuth, todoController.insert);
router.delete('/tasks/:id', withAuth, todoController.removeOne);
router.put('/tasks/:id', updateTaskMiddleware, withAuth, todoController.updateOne);

export default router;
