import { Express } from "express";
import graphqlHTTP from "express-graphql";
import { schema } from "../graph-api/schema";
import { rootValue } from "../graph-api/resolver";

export function registerGraphQLApi(app: Express, path: string) {
  app.use(path, graphqlHTTP({ schema, rootValue, graphiql: true }));
}
