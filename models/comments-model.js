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

exports.insertCommentOnArticle = async (id, username, body) => {
  if (body === undefined || username == undefined) {
    return Promise.reject({
      status: 400,
      msg: "No body or username key provided in the body of the request",
    });
  }

  const response = await db.query(
    "INSERT INTO comments (author, article_id, body) VALUES ($1, $2, $3) RETURNING *;",
    [username, id, body]
  );

  return response.rows[0];
};
