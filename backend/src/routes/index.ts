import { Router } from 'express';
import userRoutes from './user.routes';
import albumRoutes from './album.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/albums', albumRoutes)

export default routes;

