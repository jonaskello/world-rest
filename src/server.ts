import express from "express";
import cors from "cors";
import * as db from "./db";

require("source-map-support").install();

async function startServer(): Promise<void> {
  const pool = await db.createConnectionPool();
  const app = express();
  app.use(cors());
  app.get("/countries", async (_req, res) => {
    res.send(await db.getCountries(pool));
  });
  app.get("/countries/:code", async (req, res) => {
    res.send(await db.getCountry(pool, req.params.code));
  });
  app.get("/cities", async (_req, res) => {
    res.send(await db.getCities(pool));
  });
  app.get("/cities/:id", async (req, res) => {
    res.send(await db.getCity(pool, parseInt(req.params.id)));
  });
  app.listen(4000, "0.0.0.0");
  console.log(`Server listening at http://"0.0.0.0":4000`);
}

startServer();
