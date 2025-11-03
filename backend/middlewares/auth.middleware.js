import { verifyToken } from "../utils/jwt.util.js";
import { STATUS_CODES, MESSAGES } from "../constants/index.js";

export function authorizeUser(request, response, next) {
  try {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return response.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.UNAUTHORIZED,
      });
    }

    const token = authorizationHeader.split(" ")[1];
    const decoded = verifyToken(token);

    request.user = decoded;
    next();
  } catch (error) {
    return response.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.INVALID_TOKEN,
      error: error.message,
    });
  }
}
