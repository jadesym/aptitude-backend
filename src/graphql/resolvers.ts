import ServerStatusQueryResolver from './resolvers/queries/serverStatus';

import CreateProductEmailSubscriptionMutationResolver from './resolvers/mutations/createProductEmailSubscription';

import { IResolvers } from 'graphql-tools';

const resolvers: IResolvers = {
  Query: {
    serverStatus: ServerStatusQueryResolver,
  },
  Mutation: {
    createProductEmailSubscription: CreateProductEmailSubscriptionMutationResolver,
  },
};

export default resolvers;
