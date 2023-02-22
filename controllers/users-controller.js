const { fetchAllUsers } = require("../models/users-model.js");

const getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getAllUsers,
};
