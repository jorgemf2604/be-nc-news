const {
  fetchAllUsers,
  fetchUserByUsername,
} = require("../models/users-model.js");

const getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((error) => {
      next(error);
    });
};

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getAllUsers,
  getUserByUsername,
};
