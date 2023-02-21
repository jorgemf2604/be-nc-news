const db = require("../db/connection.js");

const fetcharticlesIds = () => {
  return db.query("Select article_id FROM articles;");
};

const fetchCommentsByArticleId = (id) => {
  return db.query(
    "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;",
    [id]
  );
};

module.exports = {
  fetchCommentsByArticleId,
  fetcharticlesIds,
};
