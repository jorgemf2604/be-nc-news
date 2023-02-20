const { fetchAllArticles } = require("../models/articles-model.js");

const getAllArticles = (req, res, next) => {
  fetchAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getAllArticles,
};
