import express from "express";
import { registerCors } from "./middlewares/cors";
import { registerUploadDestination } from "./middlewares/upload";
import { registerStaticFolder } from "./middlewares/static";
import { configuration } from "./configuration";
import { registerGraphQLApi } from "./middlewares/graphql";
import { readGames } from "./games/readFromGamesFolder";

const app = express();
const { gamesFolder, port } = configuration;

registerCors(app);
registerUploadDestination(app, gamesFolder, "game");
registerStaticFolder(app, gamesFolder);
registerGraphQLApi(app, "/graphql");

app.get("/files", (_: any, res: any) => {
  const files = readGames();
  res.send(files);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
