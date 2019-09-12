// import mssql from "mssql";

// export interface CommandVariables {
//   readonly [name: string]: unknown;
// }

// export interface CommandResult {
//   readonly rowsAffected: number;
// }

// export async function runCommand(
//   pool: mssql.ConnectionPool,
//   sql: string,
//   variables?: CommandVariables,
//   caller: string = ""
// ): Promise<CommandResult> {
//   const startTime = Date.now();
//   const request = pool.request();
//   if (variables) {
//     for (const key of Object.keys(variables)) {
//       request.input(key, variables[key]);
//     }
//   }
//   const result = await request.query(sql);
//   console.log("%s: %dms", "runCommand " + caller, Date.now() - startTime);
//   return { rowsAffected: result.rowsAffected[0] };
// }
