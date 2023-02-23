const { fetchEndpoints } = require("../models/endpoints-model.js");

exports.getEndpoints = (req, res, next) => {
  fetchEndpoints()
    .then((endpoints) => {
      res.status(200).send({ endpoints });
    })
    .catch((error) => {
      next(error);
    });
};
