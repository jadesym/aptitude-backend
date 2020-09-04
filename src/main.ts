import { getPort } from './env';
import { connectToDatabase } from './database/mongo/init';
import server from './graphql/server';

// Initialize connection to database
connectToDatabase();

server
  .listen({
    // TODO | Set playground to only be available in dev environment
    cors: { origin: true, credentials: true },
    port: getPort(),
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
