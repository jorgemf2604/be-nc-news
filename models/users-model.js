const db = require("../db/connection.js");

exports.fetchAllUsers = () => {
  return db.query("SELECT * FROM users;").then((result) => result.rows);
};

exports.fetchUserByUsername = (username) => {
  return db
    .query("SELECT * FROM users;")
    .then((response) => response.rows)
    .then((users) => {
      const userArr = users.filter((user) => user.username === username);
      if (userArr.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Username not found",
        });
      }
      return userArr[0];
    });
};
