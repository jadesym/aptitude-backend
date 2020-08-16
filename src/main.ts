import express from 'express';
import initializeRoutes from './routes/routes';
import { getPort } from './env';
import { connectToDatabase } from './database/mongo/init';

// Initialize connection to database
connectToDatabase();

const app = express();

initializeRoutes(app);

const PORT = getPort();

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
