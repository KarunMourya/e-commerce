import { STATUS_CODE } from "../constants/requestResponseStatus.constant.js";

export function validate(schema) {
  return (request, response, next) => {
    const { error } = schema.validate(request.body);
    if (error) {
      return response.status(STATUS_CODE.BAD_REQUEST).json({
        success: false,
        message: error.details[0].message,
      });
    }
    next();
  };
}
