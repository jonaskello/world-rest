import express from "express";
import { createConnectionPool, runQuery } from "./db";

require("source-map-support").install();

async function startServer(): Promise<void> {
  const pool = await createConnectionPool();

  const app = express();

  app.get("/test1", (_req, res) => res.send("Hello World!"));
  app.get("/test2", async (_req, res) => {
    const result = await runQuery(pool, "select * from city;");
    res.send(result);
  });

  const port = 4000;
  const ip = "0.0.0.0";
  app.listen(port, ip);
  console.log(`Server listening at http://${ip}:${port}`);
}

startServer();
