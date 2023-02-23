const db = require("../db/connection.js");
const { fetchAllTopics } = require("./topics-model.js");

const fetchAllArticles = async (
  sort_by = "created_at",
  order = "desc",
  topic
) => {
  if (
    ![
      "article_id",
      "title",
      "author",
      "topic",
      "created_at",
      "votes",
      "article_img_url",
      "comment_count",
    ].includes(sort_by)
  ) {
    return Promise.reject({ status: 400, msg: "Invalid sort query" });
  }

  if (!["desc", "asc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  const topicsObjArr = await fetchAllTopics();
  const topicsArr = topicsObjArr.map((obj) => obj.slug);
  const topicInTopics = topicsArr.some((item) => item === topic);
  if (!topicInTopics && topic !== undefined) {
    return Promise.reject({ status: 404, msg: "Topic not found" });
  }
  let query =
    "SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::Int AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id";
  if (topic !== undefined) {
    query += ` WHERE articles.topic = $1 `;
  }
  query += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;

  if (topic !== undefined) {
    return db.query(query, [topic]).then((response) => response.rows);
  }
  return db.query(query).then((response) => response.rows);
};

// const fetchArticleById = (id) => {
//   return db
//     .query("SELECT * FROM articles WHERE article_id = $1", [id])
//     .then((response) => response.rows)
//     .then((articles) => {
//       if (articles.length === 0) {
//         return Promise.reject({
//           status: 404,
//           msg: "Article not found",
//         });
//       } else {
//         return articles[0];
//       }
//     });
// };

const fetchArticleById = (id) => {
  return db
    .query(
      "SELECT articles.*, CAST(COUNT(comment_id) AS int) AS comment_count  FROM articles LEFT JOIN comments ON comments.article_id=articles.article_id WHERE articles.article_id=$1 GROUP BY articles.article_id;",
      [id]
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
