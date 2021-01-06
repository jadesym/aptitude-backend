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
    apiServerVersion: String
  }

  type Query {
    serverStatus: ServerStatus
  }

  enum ProductType {
    PRODUCT_LAUNCH
  }

  input CreateProductEmailSubscriptionInput {
    email: String!
    productType: ProductType!
  }

  type Mutation {
    createProductEmailSubscription(
      input: CreateProductEmailSubscriptionInput!
    ): String!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default typeDefs;
