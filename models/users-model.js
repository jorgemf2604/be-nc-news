const db = require("../db/connection.js");

exports.fetchAllUsers = () => {
  return db.query("SELECT * FROM users;").then((result) => result.rows);
};
