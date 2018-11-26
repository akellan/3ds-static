const express = require("express");
const fs = require("fs");

require("./models/folder");
const app = express();

app.set("view engine", "pug");
app.use("/static", express.static("static"));

const port = 3000;

app.get("/", (req, res) => {
  const files = fs.readdirSync("./static");
  const address = "http://192.168.0.174:3001/static/";

  res.render("index", { files, address });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
