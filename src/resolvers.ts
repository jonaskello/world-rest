const queryResolver = {
  countries: async (_parent, _args, _ctx) => {
    return null;
  }
};

export const resolvers = {
  Query: queryResolver,
  Country: countryResolver
};
