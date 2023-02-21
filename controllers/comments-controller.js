const {
  fetchCommentsByArticleId,
  fetcharticlesIds,
} = require("../models/comments-model.js");

const getCommentsByArticleId = (req, res, next) => {
  const { articleId } = req.params;
  const promiseFilteredComments = fetchCommentsByArticleId(articleId);
  const promiseArticlesIds = fetcharticlesIds();
  Promise.all([promiseFilteredComments, promiseArticlesIds])
    .then((result) => {
      const [result1, result2] = result;
      const { rows: filteredComments } = result1;
      const { rows: articlesIds } = result2;
      const idInIdsArray = articlesIds.some(
        (article) => article.article_id === Number(articleId)
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

module.exports = {
  getCommentsByArticleId,
};
