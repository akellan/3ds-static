const express = require("express");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "static/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var staticUpload = multer({ storage });
const fs = require("fs");

require("./models/folder");
const app = express();

app.set("view engine", "pug");
app.use("/static", express.static("static"));

const port = 3000;

app.post("/upload", staticUpload.single("game"));

app.get("/files", (req, res) => {
  const files = fs.readdirSync("./static");
  const address = `http://${req.hostname}:${port}/static/`;

  const fileAdresses = files.map(filename => address + filename);
  res.send(fileAdresses);
});

app.get("/", (req, res) => {
  const files = fs.readdirSync("./static");
  const address = `http://${req.hostname}:${port}/static/`;

  res.render("index", { files, address });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
