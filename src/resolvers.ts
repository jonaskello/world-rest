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
  country: async (_parent, args, ctx: Context) => {
    const rows = await runQuery(
      ctx.pool,
      `select code, name, continent from country where code = '${args.code}'`
    );
    return rows[0];
  }
};

const countryResolver = {
  code: async (_parent, _args, _ctx) => {
    return null;
  },
  name: async (parent, _args, _ctx: Context) => {
    // const rows = await runQuery(
    //   ctx.pool,
    //   `SELECT * FROM country WHERE code = '${parent.code}';`
    // );
    // return rows[0].name;
    return parent.name;
  },
  continent: async (parent, _args, _ctx: Context) => {
    // const rows = await runQuery(
    //   ctx.pool,
    //   `SELECT * FROM country WHERE code = '${parent.code}';`
    // );
    // return rows[0].continent;
    return parent.continent;
  },
  cities: async (parent, _args, ctx: Context) => {
    const rows = await runQuery(
      ctx.pool,
      `SELECT id, name FROM city WHERE country_code = '${parent.code}';`
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
  }
};

export const resolvers = {
  Query: queryResolver,
  Country: countryResolver,
  City: cityResolver
};
