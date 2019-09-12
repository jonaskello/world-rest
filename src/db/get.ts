import pg from "pg";
import { runQuery } from "./run-query";

const baseUrl = "http://localhost:4000";

export async function getCities(pool: pg.Pool) {
  const cities = await runQuery(pool, "SELECT * FROM city;");
  return cities.map(buildCity);
}

export async function getCity(pool: pg.Pool, id: number) {
  const rows = await runQuery(pool, `SELECT * FROM city WHERE id = ${id};`);
  return buildCity(rows[0]);
}

export async function getCountry(pool: pg.Pool, code: string) {
  const rows = await runQuery(
    pool,
    `SELECT * FROM country WHERE code = '${code}';`
  );
  return buildCountry(pool, rows[0]);
}

export async function getCountries(pool: pg.Pool) {
  const countries = await runQuery(pool, "select * from country;");
  const countriesWithCities = [];
  for (const c of countries) {
    countriesWithCities.push(await buildCountry(pool, c));
  }
  return countriesWithCities;
}

async function buildCountry(pool: pg.Pool, c: any) {
  const cities = await runQuery(
    pool,
    `SELECT id FROM city WHERE country_code = '${c.code}';`
  );
  return {
    ...c,
    cities: cities.map(city => `${baseUrl}/cities/${city.id}`)
  };
}

function buildCity(r: any) {
  return {
    ...r,
    country_code: undefined,
    country: `${baseUrl}/countries/${r.country_code}`
  };
}
