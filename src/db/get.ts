import pg from "pg";
import { runQuery } from "./run-query";

export async function getCities(pool: pg.Pool) {
  const cities = await runQuery(pool, "select * from city;");
  const citiesWithCountry = cities.map(buildCity);
  return citiesWithCountry;
}

export async function getCity(pool: pg.Pool, id: number) {
  const rows = await runQuery(pool, `select * from city where id = ${id};`);
  return buildCity(rows[0]);
}

export async function getCountry(pool: pg.Pool, code: string) {
  const rows = await runQuery(
    pool,
    `select * from country where code = '${code}';`
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
    `select id from city where country_code = '${c.code}';`
  );
  return {
    ...c,
    cities: cities.map(city => `http://localhost:4000/cities/${city.id}`)
  };
}

function buildCity(r: any) {
  return {
    ...r,
    country_code: undefined,
    country: `http://localhost:4000/countries/${r.country_code}`
  };
}
