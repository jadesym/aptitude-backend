import { Router } from 'express';
import cors from 'cors';

// Enabling cors is fine only for PUBLIC APIs:
// https://stackoverflow.com/a/43154277
const enabledCors = cors({ origin: true, credentials: true });
const statusRouter = Router();

statusRouter.get('/', enabledCors, (_req, res) => {
  res.json({
    isServerAvailable: true,
  });
});

export default statusRouter;
