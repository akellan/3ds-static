const express = require("express");

function register(app, folder) {
  app.use("/static", express.static(folder));
}

module.exports = {
  register
};
