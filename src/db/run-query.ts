import * as pg from "pg";

export async function runQuery<TRow extends pg.QueryResultRow>(
  poolOrClient: pg.Pool | pg.PoolClient,
  sql: string,
  variables?: Array<unknown>,
  caller: string = ""
): Promise<ReadonlyArray<TRow>> {
  const startTime = Date.now();
  const result = await poolOrClient.query<TRow>(sql, variables as Array<
    unknown
  >);
  console.log("%s: %dms", "runQuery " + caller, Date.now() - startTime);
  return result.rows;
}
