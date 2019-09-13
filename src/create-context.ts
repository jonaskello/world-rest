import pg from "pg";
import DataLoader from "dataloader";
import { countriesForCodes, citiesForCountryCodes } from "./loaders";

export interface Context {
  readonly pool: pg.Pool;
  readonly loaders: {
    countryByCode: DataLoader<string, any>;
    citiesByCountryCode: DataLoader<string, any>;
  };
}

export function createContext(pool: pg.Pool): Context {
  return {
    pool,
    loaders: {
      countryByCode: new DataLoader(countriesForCodes(pool)),
      citiesByCountryCode: new DataLoader(citiesForCountryCodes(pool))
    }
  };
}
