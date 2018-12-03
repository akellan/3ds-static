import express from "express";
import fs from "fs";
import { registerCors } from "./middlewares/cors";
import { registerUploadDestination } from "./middlewares/upload";
import { registerStaticFolder } from "./middlewares/static";
import { configuration } from "./configuration";

const app = express();
const { gamesFolder, port } = configuration;

registerCors(app);
registerUploadDestination(app, gamesFolder, "game");
registerStaticFolder(app, gamesFolder);

app.get("/files", (_: any, res: any) => {
  const files = fs.readdirSync(gamesFolder);
  const relativePath = `static/`;

  const fileAdresses = files.map((filename: any) => ({
    relativePath,
    filename
  }));
  res.send(fileAdresses);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
