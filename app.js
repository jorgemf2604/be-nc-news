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
  postCommentOnArticle,
} = require("./controllers/comments-controller.js");

const app = express();
app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postCommentOnArticle);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Path not found!" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500Errors);

module.exports = app;
