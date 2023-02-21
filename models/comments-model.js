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
  const articleIdIsValid = await checkArticleIdIsValid(id);
  const usernameIsValid = await checkUsernameIsValid(username);

  if (!usernameIsValid) {
    return Promise.reject({
      status: 404,
      msg: `We could not find username`,
    });
  }

  if (!articleIdIsValid) {
    return Promise.reject({
      status: 404,
      msg: `We could not find the article id`,
    });
  }

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

  return response.rows;
};

const checkArticleIdIsValid = (articleId) => {
  return db
    .query("SELECT * FROM articles WHERE articles.article_id=$1", [articleId])
    .then((response) => response.rows)
    .then((articles) => !(articles.length === 0));
};

const checkUsernameIsValid = (username) => {
  return db
    .query("SELECT * FROM users WHERE username=$1;", [username])
    .then((response) => response.rows)
    .then((usernames) => !(usernames.length === 0));
};
