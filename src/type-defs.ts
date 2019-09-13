import gql from "graphql-tag";

export const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    countries: [Country!]!
  }

  type Country {
    code: String!
    name: String!
    continent: String!
  }

  type City {
    id: Int!
    name: String!
  }
`;
