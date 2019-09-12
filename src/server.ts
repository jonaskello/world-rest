import express from "express";
import { createConnectionPool, runQuery } from "./db";
import cors from "cors";

require("source-map-support").install();

async function startServer(): Promise<void> {
  const pool = await createConnectionPool();

  const app = express();
  app.use(cors());
  app.get("/cities", async (_req, res) => {
    const result = await runQuery(pool, "select * from city;");
    res.send(result);
  });
  app.get("/cities/:id", async (req, res) => {
    const result = await runQuery(
      pool,
      `select * from city where id = ${req.params.id};`
    );
    res.send(result);
  });
  app.get("/countries", async (_req, res) => {
    const result = await runQuery(pool, "select * from country;");
    res.send(result);
  });
  app.get("/countries/:code", async (req, res) => {
    const result = await runQuery(
      pool,
      `select * from country where code = '${req.params.code}';`
    );
    res.send(result);
  });

  const port = 4000;
  const ip = "0.0.0.0";
  app.listen(port, ip);
  console.log(`Server listening at http://${ip}:${port}`);
}

startServer();
