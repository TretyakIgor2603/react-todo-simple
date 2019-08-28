import * as todoController from '../controllers/todo';
import withAuth from '../middleware/auth';
import Router from 'express-promise-router';
import { createValidator } from '../middleware/validation';
import * as todoSchemas from '../validation/todoSchemas';

const router = Router();
const updateTaskMiddleware = createValidator(todoSchemas.updateTask);

router.get('/tasks/', withAuth, todoController.get);
router.post('/tasks/', withAuth, todoController.create);
router.delete('/tasks/:id', withAuth, todoController.remove);
router.put('/tasks/:id', updateTaskMiddleware, withAuth, todoController.update);

export default router;
