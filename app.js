const express = require("express");
const { handle500Errors } = require("./controllers/error-handling.js");
const { getAllTopics } = require("./controllers/topics-controller.js");

const app = express();

app.get("/api/topics", getAllTopics);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Path not found!" });
});

app.use(handle500Errors);

module.exports = app;
