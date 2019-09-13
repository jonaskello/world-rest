import pg from "pg";
import { runQuery } from "./db";
import DataLoader from "dataloader";

export interface Context {
  readonly pool: pg.Pool;
  readonly loaders: {
    countryByCode: DataLoader<string, any>;
  };
}

export const countriesForCodes = pool => async codes => {
  const sql = `SELECT PersonId, FirstName FROM dbo.Person WHERE PersonId IN (${codes})`;
  const rows = await runQuery(pool, sql);
  const countryByCode = Object.fromEntries(rows.map(r => [r.code, r]));
  const result = codes.map(code => countryByCode[code]);
  return result;
};

export function createContext(pool: pg.Pool): Context {
  return {
    pool,
    loaders: {
      countryByCode: new DataLoader(countriesForCodes(pool))
    }
  };
}
