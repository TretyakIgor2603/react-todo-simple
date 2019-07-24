const errorHandler = (res, error, statusCode = 500) => {
  res.status(statusCode).send({
    success: false,
    message: error.message ? error.message : error
  });
};

export default errorHandler;
