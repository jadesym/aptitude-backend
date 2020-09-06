import { gql } from 'apollo-server';

const typeDefs = gql`
  enum MongoDBConnectionStatus {
    CONNECTING
    FAILED_TO_CONNECT
    CONNECTED
    DISCONNECTED
  }

  type ServerStatus {
    isServerAvailable: Boolean
    mongoDBConnectionStatus: MongoDBConnectionStatus
  }

  type Query {
    serverStatus: ServerStatus
  }

  enum ProductType {
    PRODUCT_LAUNCH
  }

  input SubcribeToProductEmailInput {
    email: String!
    productType: ProductType!
  }

  type Mutation {
    subscribeToProductEmail(input: SubcribeToProductEmailInput!): String!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default typeDefs;
