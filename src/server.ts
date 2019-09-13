import express from "express";
import cors from "cors";
import * as db from "./db";
import graphqlHTTP, { OptionsData } from "express-graphql";
import { GraphQLError } from "graphql";
import { schema } from "./schema";
import { createContext } from "./context";

require("source-map-support").install();

async function startServer(): Promise<void> {
  const pool = await db.createConnectionPool();
  const app = express();
  app.use(cors());

  app.use(
    "/graphql",
    graphqlHTTP(
      _req =>
        ({
          schema,
          context: createContext(pool),
          rootValue: {},
          graphiql: true,
          customFormatErrorFn: (error: GraphQLError) => {
            console.log("Error occured in GraphQL:");
            console.log(error);
            console.log("The original error was:");
            console.log(error.originalError);
            return error;
          }
          // tslint:disable-next-line:no-any
        } as OptionsData & {
          readonly customFormatErrorFn?: ((error: GraphQLError) => any) | null;
        })
    )
  );

  // app.get("/countries", async (_req, res) => {
  //   res.send(await db.getCountries(pool));
  // });
  // app.get("/countries/:code", async (req, res) => {
  //   res.send(await db.getCountry(pool, req.params.code));
  // });
  // app.get("/cities", async (_req, res) => {
  //   res.send(await db.getCities(pool));
  // });
  // app.get("/cities/:id", async (req, res) => {
  //   res.send(await db.getCity(pool, parseInt(req.params.id)));
  // });
  app.listen(4000, "0.0.0.0");
  console.log(`Server listening at http://"0.0.0.0":4000`);
}

startServer();
