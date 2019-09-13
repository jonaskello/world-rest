import gql from "graphql-tag";

export const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    countries: [Country!]!
    country(code: String!): Country
  }

  type Country {
    code: String!
    name: String!
    continent: String!
    cities: [City!]!
  }

  type City {
    id: Int!
    name: String!
  }
`;
