import mongoose from 'mongoose';
import { getEnv, getMongoDBConnectionString } from '../../env';
import { Mongoose } from 'mongoose';

mongoose.Promise = global.Promise;

// TODO | Enforce trimming of strings and strings being required
// mongoose.Schema.Types.String.set(String.trim);
// mongoose.Schema.Types.String.required(true);

export async function connectToDatabase(): Promise<Mongoose> {
  console.log(`Connecting to MongoDB in env: ${getEnv()}`);
  const mongoConnectionStr = getMongoDBConnectionString();
  const connection = await mongoose.connect(mongoConnectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Successfully connected to MongoDB`);
  return connection;
}

export async function disconnectFromDatabase(): Promise<void> {
  console.log(`Disconnecting from MongoDB in env: ${getEnv()}`);
  const disconnection = await mongoose.disconnect();
  console.log(`Successfully disconnected to MongoDB`);
  return disconnection;
}
