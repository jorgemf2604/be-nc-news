const db = require("../db/connection.js");

const fetchAllArticles = () => {
  return db
    .query(
      "SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::Int AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at;"
    )
    .then((response) => response.rows);
};

module.exports = {
  fetchAllArticles,
};
