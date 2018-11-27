const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("./middlewares/cors");
const upload = require("./middlewares/upload");
const static = require("./middlewares/static");

const gamesFolder = path.join(__dirname, "static");
const port = 3000;
const app = express();

cors.register(app);
upload.register(app, gamesFolder, "game");
static.register(app, gamesFolder);

app.get("/files", (req, res) => {
  const files = fs.readdirSync("./static");
  const address = `static/`;

  const fileAdresses = files.map(filename => address + filename);
  res.send(fileAdresses);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
