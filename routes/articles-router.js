const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  patchArticle,
} = require("../controllers/articles-controller.js");
const {
  getCommentsByArticleId,
  postCommentOnArticle,
} = require("../controllers/comments-controller.js");

articlesRouter.get("/", getAllArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticle);
articlesRouter.get("/:article_id/comments", getCommentsByArticleId);
articlesRouter.post("/:article_id/comments", postCommentOnArticle);

module.exports = articlesRouter;
