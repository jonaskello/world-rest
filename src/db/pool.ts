import pg from "pg";

export function createConnectionPool(): pg.Pool {
  return new pg.Pool({
    host: "192.168.1.20",
    port: 5050,
    database: "world-db",
    user: "world",
    password: "world123"
  });
}
