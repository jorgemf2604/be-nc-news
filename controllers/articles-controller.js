const {
  fetchAllArticles,
  fetchArticleById,
  modifyArticle,
  insertArticle,
} = require("../models/articles-model.js");

const getAllArticles = (req, res, next) => {
  const { topic, sort_by, order } = req.query;
  fetchAllArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((error) => {
      next(error);
    });
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((error) => {
      next(error);
    });
};

const patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  modifyArticle(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getAllArticles,
  getArticleById,
  patchArticle,
};
