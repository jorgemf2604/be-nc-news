const { fetchAllTopics } = require("../models/topics-model.js");

const getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getAllTopics };
