const express = require("express");
const fs = require("fs");
const cors = require("./middlewares/cors");
const upload = require("./middlewares/upload");
const static = require("./middlewares/static");
const config = require("./configuration");

const app = express();
const { gamesFolder, port } = config;

cors.register(app);
upload.register(app, gamesFolder, "game");
static.register(app, gamesFolder);

app.get("/files", (req, res) => {
  const files = fs.readdirSync(gamesFolder);
  const address = `static/`;

  const fileAdresses = files.map(filename => address + filename);
  res.send(fileAdresses);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
