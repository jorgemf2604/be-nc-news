const express = require("express");
const {
  handle500Errors,
  handleCustomErrors,
  handlePsqlErrors,
} = require("./controllers/error-handling.js");
const { getAllTopics } = require("./controllers/topics-controller.js");
const {
  getAllArticles,
  getArticleById,
} = require("./controllers/articles-controller.js");
const {
  getCommentsByArticleId,
} = require("./controllers/comments-controller.js");

const app = express();

app.get("/api/topics", getAllTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:articleId", getArticleById);
app.get("/api/articles/:articleId/comments", getCommentsByArticleId);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Path not found!" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500Errors);

module.exports = app;
