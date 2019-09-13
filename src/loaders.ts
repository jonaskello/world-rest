import { runQuery } from "./db";

export const countriesForCodes = pool => async codes => {
  const sql = `SELECT * FROM country WHERE code IN (${codes
    .map(c => `'${c}'`)
    .join(", ")})`;
  const rows = await runQuery(pool, sql);
  const countryByCode = Object.fromEntries(rows.map(r => [r.code, r]));
  return codes.map(code => countryByCode[code]);
};

export const citiesForIds = pool => async ids => {
  const sql = `SELECT * FROM city WHERE code IN (${ids
    .map(c => `'${c}'`)
    .join(", ")})`;
  const rows = await runQuery(pool, sql);
  const cityById = Object.fromEntries(rows.map(r => [r.code, r]));
  return ids.map(code => cityById[code]);
};
