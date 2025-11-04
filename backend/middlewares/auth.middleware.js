import { verifyToken } from "../utils/jwt.util.js";
import { STATUS_CODE, STATUS_MESSAGE } from "../constants/requestResponseStatus.constant.js";

export function authorizeUser(request, response, next) {
  try {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return response.status(STATUS_CODE.UNAUTHORIZED).json({
        success: false,
        message: STATUS_MESSAGE.UNAUTHORIZED,
      });
    }

    const token = authorizationHeader.split(" ")[1];
    const decoded = verifyToken(token);

    request.user = decoded;
    next();
  } catch (error) {
    return response.status(STATUS_CODE.UNAUTHORIZED).json({
      success: false,
      message: STATUS_MESSAGE.INVALID_TOKEN,
      error: error.message,
    });
  }
}
