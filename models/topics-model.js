const db = require("../db/connection.js");

const fetchAllTopics = () => {
  return db.query("SELECT * FROM topics;").then((response) => response.rows);
};

module.exports = {
  fetchAllTopics,
};
