const db = require("../db/connection.js");

const fetchAllArticles = () => {
  return db
    .query(
      "SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::Int AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at;"
    )
    .then((response) => response.rows);
};

const fetchArticleById = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((response) => response.rows)
    .then((articles) => {
      if (articles.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article not found",
        });
      } else {
        return articles[0];
      }
    });
};

const modifyArticle = (id, votes) => {
  if (!votes) {
    return Promise.reject({
      status: 400,
      msg: "Invalid input. Votes is a not null key",
    });
  }
  return db
    .query(
      "UPDATE articles SET votes=votes + $1 WHERE article_id=$2 RETURNING *;",
      [votes, id]
    )
    .then((response) => response.rows)
    .then((articles) => {
      if (articles.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article not found",
        });
      } else {
        return articles[0];
      }
    });
};

module.exports = {
  fetchAllArticles,
  fetchArticleById,
  modifyArticle,
};
