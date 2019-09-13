import { runQuery } from "./db";
import { Context } from "./create-context";

const queryResolver = {
  countries: async (_parent, _args, ctx: Context) => {
    const countries = await runQuery(
      ctx.pool,
      "select code, name, continent from country;"
    );
    return countries;
  },
  country: async (_parent, args, ctx: Context) =>
    ctx.loaders.countryByCode.load(args.code)
};

const countryResolver = {
  code: async (parent, _args, _ctx) => parent.code,
  name: async (parent, _args, ctx: Context) => {
    const country = await ctx.loaders.countryByCode.load(parent.code);
    return country.name;
  },
  continent: async (parent, _args, ctx: Context) => {
    const country = await ctx.loaders.countryByCode.load(parent.code);
    return country.continent;
  },
  cities: async (parent, _args, ctx: Context) => {
    const rows = await runQuery(
      ctx.pool,
      `SELECT id, name, country_code FROM city WHERE country_code = '${parent.code}';`
    );
    return rows;
  }
};

const cityResolver = {
  id: async (parent, _args, _ctx) => {
    return parent.id;
  },
  name: async (parent, _args, _ctx) => {
    return parent.name;
  },
  country: async (parent, _args, _ctx) => {
    return { code: parent.country_code };
  }
};

export const resolvers = {
  Query: queryResolver,
  Country: countryResolver,
  City: cityResolver
};
