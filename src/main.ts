import express from 'express';
import initializeRoutes from './routes/routes';

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
