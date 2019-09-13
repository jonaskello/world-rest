import { runQuery } from "./db";
import { Context } from "./context";

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
  cities: async (parent, _args, ctx: Context) =>
    ctx.loaders.citiesByCountryCode.load(parent.code)
};

const cityResolver = {
  id: async (parent, _args, _ctx) => parent.id,
  name: async (parent, _args, _ctx) => parent.name,
  country: async (parent, _args, _ctx) => ({ code: parent.country_code })
};

export const resolvers = {
  Query: queryResolver,
  Country: countryResolver,
  City: cityResolver
};
