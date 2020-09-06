import {
  create,
  ProductType,
} from '../database/mongo/dataApi/productEmailSubscription';
import {
  getCurrentConnectionStatus,
  MongoDBConnectionStatus,
} from '../database/mongo/init';
import { IResolvers } from 'graphql-tools';

const resolvers: IResolvers = {
  Query: {
    serverStatus: (): {
      isServerAvailable: boolean;
      mongoDBConnectionStatus: MongoDBConnectionStatus;
    } => {
      return {
        isServerAvailable: true,
        mongoDBConnectionStatus: getCurrentConnectionStatus(),
      };
    },
  },
  Mutation: {
    subscribeToProductEmail: async (
      _: unknown,
      {
        input: { email, productType },
      }: { input: { email: string; productType: ProductType } },
    ): Promise<string> => {
      await create(email, productType);
      return email;
    },
  },
};

export default resolvers;
