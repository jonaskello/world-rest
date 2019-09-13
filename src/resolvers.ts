const queryResolver = {
  countries: async (_parent, _args, _ctx) => {
    return null;
  }
};

const countryResolver = {
  code: async (_parent, _args, _ctx) => {
    return null;
  },
  name: async (_parent, _args, _ctx) => {
    return null;
  },
  continent: async (_parent, _args, _ctx) => {
    return null;
  }
};

const cityResolver = {
  id: async (_parent, _args, _ctx) => {
    return null;
  },
  name: async (_parent, _args, _ctx) => {
    return null;
  }
};

export const resolvers = {
  Query: queryResolver,
  Country: countryResolver,
  City: cityResolver
};
