var path = require("path");
var express = require("express");
var logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use("/app", express.static(path.join(__dirname, "dist")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = app;
