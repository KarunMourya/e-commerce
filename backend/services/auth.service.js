import db from "../models/index.js";
import { STATUS_MESSAGE, STATUS_CODE } from "../constants/requestResponseStatus.constant.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import { generateToken } from "../utils/jwt.util.js";

const User = db.User;

export async function registerService(payload) {
  const { name, email, password } = payload;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error(STATUS_MESSAGE.USER_ALREADY_EXISTS);
    error.statusCode = STATUS_CODE.BAD_REQUEST;
    throw error;
  }

  const encryptedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export async function loginService(payload) {
  const { email, password } = payload;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error(STATUS_MESSAGE.USER_NOT_FOUND);
    error.statusCode = STATUS_CODE.NOT_FOUND;
    throw error;
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    const error = new Error(STATUS_MESSAGE.INVALID_PASSWORD);
    error.statusCode = STATUS_CODE.BAD_REQUEST;
    throw error;
  }

  const token = generateToken({ id: user.id });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  };
}
