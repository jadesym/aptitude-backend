import dotenvFlow from 'dotenv-flow';

/*
Configure the environment variables
NOTE: This configuration should happen before everything else to
ensure that necessary environment variables are available for access.
*/
dotenvFlow.config({
  node_env: process.env.NODE_ENV,
  default_node_env: 'development',
  encoding: 'utf8',
  path: './env',
});

export function getMongoDBConnectionString(): string {
  /*
  These are fetched during the function since configuration
  of the environment variables may occur after this file is imported.
  */
  const {
    MONGO_DB_URI_SCHEME,
    MONGO_DB_USER_NAME,
    MONGO_DB_PASSWORD,
    MONGO_DB_HOST_NAME,
    MONGO_DB_PORT,
    MONGO_DB_NAME,
  } = process.env;

  return `${MONGO_DB_URI_SCHEME}://${MONGO_DB_USER_NAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST_NAME}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;
}

export function getPort(): string {
  if (process.env.PORT === undefined) {
    throw new Error('PORT environment variable must be non-empty.');
  }
  return process.env.PORT;
}

export function getEnv(): string {
  if (process.env.NODE_ENV === undefined) {
    throw new Error('NODE_ENV environment variable must be non-empty.');
  }
  return process.env.NODE_ENV;
}
