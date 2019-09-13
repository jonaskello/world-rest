import { runQuery } from "./db";
import { Context } from "./create-context";

const queryResolver = {
  countries: async (_parent, _args, ctx: Context) => {
    const countries = await runQuery(ctx.pool, "select code from country;");
    return countries;
  }
};

const countryResolver = {
  code: async (_parent, _args, _ctx) => {
    return null;
  },
  name: async (parent, _args, ctx: Context) => {
    const rows = await runQuery(
      ctx.pool,
      `SELECT * FROM country WHERE code = '${parent.code}';`
    );
    return rows[0].name;
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
