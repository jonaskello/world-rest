import express from "express";
import {
  createConnectionPool,
  getCities,
  getCity,
  getCountries,
  getCountry
} from "./db";
import cors from "cors";

require("source-map-support").install();

async function startServer(): Promise<void> {
  const pool = await createConnectionPool();

  const app = express();
  app.use(cors());
  app.get("/cities", async (_req, res) => {
    res.send(await getCities(pool));
  });
  app.get("/cities/:id", async (req, res) => {
    res.send(await getCity(pool, parseInt(req.params.id)));
  });
  app.get("/countries", async (_req, res) => {
    res.send(await getCountries(pool));
  });
  app.get("/countries/:code", async (req, res) => {
    res.send(await getCountry(pool, req.params.code));
  });

  const port = 4000;
  const ip = "0.0.0.0";
  app.listen(port, ip);
  console.log(`Server listening at http://${ip}:${port}`);
}

startServer();
