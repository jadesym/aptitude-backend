import { getPort } from './env';
import { connectToDatabase } from './database/mongo/init';
import server from './graphql/server';
import logger from './logger/logger';

// Initialize connection to database
connectToDatabase();

server
  .listen({
    // TODO | Set playground to only be available in dev environment
    cors: { origin: true, credentials: true },
    port: getPort(),
  })
  .then(({ url }) => {
    logger.info(`Server ready at ${url}`);
  });
