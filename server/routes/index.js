import Router from 'express-promise-router';
import todoRoutes from '../routes/todo';
import authRoutes from '../routes/auth';
import userRoutes from '../routes/user';

const routes = Router();

routes.use('/', todoRoutes);
routes.use('/', authRoutes);
routes.use('/', userRoutes);

export default routes;