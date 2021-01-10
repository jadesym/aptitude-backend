import mongoose from 'mongoose';
import { getEnv, getMongoDBConnectionString } from '../../env';
import { Mongoose } from 'mongoose';
import logger from '../../logger/logger';

mongoose.Promise = global.Promise;

const mongooseConnection = mongoose.connection;

// TODO | Enforce trimming of strings and strings being required
// mongoose.Schema.Types.String.set(String.trim);
// mongoose.Schema.Types.String.required(true);

export enum MongoDBConnectionStatus {
  CONNECTING = 'CONNECTING',
  FAILED_TO_CONNECT = 'FAILED_TO_CONNECT',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}

let currentMongoDBConnectionStatus: MongoDBConnectionStatus =
  MongoDBConnectionStatus.DISCONNECTED;

export async function connectToDatabase(): Promise<Mongoose> {
  const mongoConnectionStr = getMongoDBConnectionString();

  const connection = await mongoose.connect(mongoConnectionStr, {
    socketTimeoutMS: 3000, // 3 seconds
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connection;
}

export async function disconnectFromDatabase(): Promise<void> {
  const disconnection = await mongoose.disconnect();
  return disconnection;
}

mongooseConnection.on('connecting', () => {
  logger.info(`Connecting to MongoDB in env: ${getEnv()}`);
  currentMongoDBConnectionStatus = MongoDBConnectionStatus.CONNECTING;
});
['connected', 'reconnected'].forEach((eventName) => {
  mongooseConnection.on(eventName, () => {
    logger.info(`Successfully ${eventName} to MongoDB`);
    currentMongoDBConnectionStatus = MongoDBConnectionStatus.CONNECTED;
  });
});
['error', 'reconnectFailed'].forEach((eventName) => {
  mongooseConnection.on(eventName, () => {
    logger.error(`Failed to connect to MongoDB during event ${eventName}`);
    currentMongoDBConnectionStatus = MongoDBConnectionStatus.FAILED_TO_CONNECT;
  });
});
mongooseConnection.on('disconnecting', () => {
  logger.error(`Disconnecting from MongoDB in env: ${getEnv()}`);
});
mongooseConnection.on('disconnected', () => {
  logger.error(`Successfully disconnected to MongoDB`);
  currentMongoDBConnectionStatus = MongoDBConnectionStatus.DISCONNECTED;
});

export function getCurrentConnectionStatus(): MongoDBConnectionStatus {
  return currentMongoDBConnectionStatus;
}
