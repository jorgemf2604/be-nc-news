const express = require("express");
const cors = require("cors");

const { apiRouter } = require("./routes/api-router.js");
const {
  handle500Errors,
  handleCustomErrors,
  handlePsqlErrors,
  handle404nonExistentPaths,
} = require("./controllers/error-handling.js");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(handle404nonExistentPaths);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500Errors);

module.exports = app;
