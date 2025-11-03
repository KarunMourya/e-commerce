import { STATUS_CODE, STATUS_MESSAGE } from "../constants/requestResponseStatus.constant.js";

export const errorHandler = (error, _, response, _next) => {
  const statusCode = error.statusCode || STATUS_CODE.SERVER_ERROR;

  return response.status(statusCode).json({
    success: false,
    message: error.message || STATUS_MESSAGE.SERVER_ERROR,
  });
};
