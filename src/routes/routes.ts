import { Express } from 'express';
import statusRouter from './status';

const initializeRoutes = (app: Express): void => {
  app.use('/status', statusRouter);
};

export default initializeRoutes;
