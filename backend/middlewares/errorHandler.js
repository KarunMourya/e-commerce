const { STATUS_CODE, STATUS_MESSAGE } = require("../constants/requestResponseStatus");

export const errorHandler = (error, _, response, _next) => {

  const statusCode = error.statusCode || STATUS_CODE.INTERNAL_ERROR;

  return response.status(statusCode).json({
    success: false,
    message: error.message || STATUS_MESSAGE.INTERNAL_ERROR,
  });
};