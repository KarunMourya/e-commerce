import { STATUS_CODE, STATUS_MESSAGE } from "../constants/requestResponseStatus.constant.js";
import { registerService, loginService } from "../services/auth.service.js";

export async function register(request, response, next) {
  try {
    const user = await registerService(request.body);

    return response.status(STATUS_CODE.CREATED).json({
      success: true,
      message: STATUS_MESSAGE.REGISTER_SUCCESS,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(request, response, next) {
  try {
    const result = await loginService(request.body);

    return response.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: STATUS_MESSAGE.LOGIN_SUCCESS,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
