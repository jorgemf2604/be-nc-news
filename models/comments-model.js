const db = require("../db/connection.js");

exports.fetcharticlesIds = () => {
  return db.query("Select article_id FROM articles;");
};

exports.fetchCommentsByArticleId = (id) => {
  return db.query(
    "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;",
    [id]
  );
};

exports.insertCommentOnArticle = (id, username, body) => {
  if (body === undefined || username == undefined) {
    return Promise.reject({
      status: 400,
      msg: "No body or username key provided in the body of the request",
    });
  }

  return db
    .query(
      "INSERT INTO comments (author, article_id, body) VALUES ($1, $2, $3) RETURNING *;",
      [username, id, body]
    )
    .then((response) => response.rows[0]);
};

exports.eraseCommentById = (id) => {
  return db
    .query("SELECT * FROM comments WHERE comment_id=$1;", [id])
    .then((response) => {
      const idInComments = response.rows.length !== 0;
      if (!idInComments) {
        return Promise.reject({
          status: 404,
          msg: "Comment Id not found",
        });
      }
      return db.query("DELETE FROM comments WHERE comment_id=$1 RETURNING *;", [
        id,
      ]);
    });
};
