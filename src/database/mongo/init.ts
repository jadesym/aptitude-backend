import mongoose from 'mongoose';
import { getMongoDBConnectionString } from '../../env';
import { Mongoose } from 'mongoose';

mongoose.Promise = global.Promise;

// TODO | Enforce trimming of strings and strings being required
// mongoose.Schema.Types.String.set(String.trim);
// mongoose.Schema.Types.String.required(true);

export async function connectToDatabase(): Promise<Mongoose> {
  const mongoConnectionStr = getMongoDBConnectionString();
  console.log(mongoConnectionStr);
  const connection = await mongoose.connect(mongoConnectionStr, {
    useNewUrlParser: true,
  });
  console.log('Connected to MongoDB');
  return connection;
}

export async function disconnectFromDatabase(): Promise<void> {
  const disconnection = await mongoose.disconnect();
  console.log('Disonnecting from MongoDB.');
  return disconnection;
}
