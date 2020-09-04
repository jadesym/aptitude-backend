import {
  create,
  ProductType,
} from '../database/mongo/dataApi/productEmailSubscription';
import { IResolvers } from 'graphql-tools';

const resolvers: IResolvers = {
  Query: {
    serverStatus: (): { isServerAvailable: boolean } => {
      return {
        isServerAvailable: true,
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
