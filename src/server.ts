import express from "express";
// import { createConnectionPool } from "./db";

// tslint:disable-next-line:no-var-requires no-require-imports
// require("source-map-support").install();

async function startServer(): Promise<void> {
  //   const pool = await createConnectionPool();

  const app = express();

  app.get("/test1", (_req, res) => res.send("Hello World!"));

  const port = 4000;
  const ip = "0.0.0.0";
  app.listen(port, ip);
  console.log(`Server listening at http://${ip}:${port}`);
}

startServer();
