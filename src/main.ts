import dotenvFlow from 'dotenv-flow';
import express from 'express';
import initializeRoutes from './routes/routes';

// Configure the environment variables
dotenvFlow.config({
  node_env: process.env.NODE_ENV,
  default_node_env: 'development',
  encoding: 'utf8',
  path: './env',
});

const app = express();

initializeRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

function greeter(person_name: string) {
  return `Hello, ${person_name}`;
}

console.log(greeter('Bob'));
