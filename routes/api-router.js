const apiRouter = require("express").Router();
const { getEndpoints } = require("../controllers/endpoints-controller.js");

apiRouter.get("/", getEndpoints);

module.exports = {
  apiRouter,
};
