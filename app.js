const express = require("express");
const {
  handle500Errors,
  handleCustomErrors,
  handlePsqlErrors,
  handle404nonExistentPaths,
} = require("./controllers/error-handling.js");
const { getAllTopics } = require("./controllers/topics-controller.js");
const {
  getAllArticles,
  getArticleById,
  patchArticle,
} = require("./controllers/articles-controller.js");
const {
  getCommentsByArticleId,
  postCommentOnArticle,
  deleteCommentById,
} = require("./controllers/comments-controller.js");
const { getAllUsers } = require("./controllers/users-controller.js");
const { getEndpoints } = require("./controllers/endpoints-controller");

const app = express();
app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/topics", getAllTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postCommentOnArticle);
app.patch("/api/articles/:article_id", patchArticle);
app.get("/api/users", getAllUsers);
app.delete("/api/comments/:comment_id", deleteCommentById);

app.use(handle404nonExistentPaths);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500Errors);

module.exports = app;
