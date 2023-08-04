const errorMiddleware = (err, req, res, next) => {
  console.log("Error middleware");
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  console.log({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

module.exports = errorMiddleware;
