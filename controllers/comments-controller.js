const {
  fetchCommentsByArticleId,
  fetcharticlesIds,
  insertCommentOnArticle,
  eraseCommentById,
} = require("../models/comments-model.js");

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const promiseFilteredComments = fetchCommentsByArticleId(article_id);
  const promiseArticlesIds = fetcharticlesIds();
  Promise.all([promiseFilteredComments, promiseArticlesIds])
    .then((result) => {
      const [result1, result2] = result;
      const { rows: filteredComments } = result1;
      const { rows: articlesIds } = result2;
      const idInIdsArray = articlesIds.some(
        (article) => article.article_id === Number(article_id)
      );

      if (filteredComments.length === 0 && !idInIdsArray) {
        return Promise.reject({
          status: 404,
          msg: "Could not fetch comments. Article id provided not found",
        });
      } else {
        if (filteredComments.length === 0) {
          res.status(200).send({ comments: [] });
        } else {
          res.status(200).send({ comments: filteredComments });
        }
      }
    })
    .catch((error) => {
      next(error);
    });
};

const postCommentOnArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  insertCommentOnArticle(article_id, username, body)
    .then((commentPosted) => {
      res.status(201).send({ comment: commentPosted });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  eraseCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getCommentsByArticleId,
  postCommentOnArticle,
  deleteCommentById,
};
