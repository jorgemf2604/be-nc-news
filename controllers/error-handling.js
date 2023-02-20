exports.handle500Errors = (error, request, response, next) => {
  console.error(error);
  response.status(500).send({ msg: "Internal Server Error" });
};
