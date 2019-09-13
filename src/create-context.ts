import pg from "pg";

export interface Context {
  readonly pool: pg.Pool;
}

export function createContext(pool: pg.Pool): Context {
  return {
    pool
  };
}
