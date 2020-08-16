import { ApolloServer, gql } from 'apollo-server';
import { getPort } from './env';
import { connectToDatabase } from './database/mongo/init';

// Initialize connection to database
connectToDatabase();

// TODO | Move this into a separate GraphQL file
const typeDefs = gql`
  type ServerStatus {
    isServerAvailable: Boolean
  }

  type Query {
    serverStatus: ServerStatus
  }
`;

// TODO | Move this into a separate resolvers file
const resolvers = {
  Query: {
    serverStatus: () => {
      return {
        isServerAvailable: true,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen({
    // TODO | Set playground to only be available in dev environment
    cors: { origin: true, credentials: true },
    port: getPort(),
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
