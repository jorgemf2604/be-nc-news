const apiRouter = require("express").Router();
const articlesRouter = require("./articles-router.js");
const topicsRouter = require("./topics-router.js");
const commentsRouter = require("./comments-router.js");
const usersRouter = require("./users-router.js");
const { getEndpoints } = require("../controllers/endpoints-controller.js");

apiRouter.get("/", getEndpoints);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

module.exports = {
  apiRouter,
};
