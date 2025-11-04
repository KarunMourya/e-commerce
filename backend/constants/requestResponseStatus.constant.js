export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,

  SERVER_ERROR: 500,
};

export const STATUS_MESSAGE = {
  SUCCESS: "Success",
  CREATED: "Created successfully",
  UPDATED: "Updated successfully",
  DELETED: "Deleted successfully",

  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Resource not found",
  SERVER_ERROR: "Internal server error",

  LOGIN_SUCCESS: "Login successful",
  REGISTER_SUCCESS: "User registered successfully",
  EMAIL_EXISTS: "Email already exists",
  INVALID_CREDENTIALS: "Invalid credentials",
  TOKEN_MISSING: "Token missing",
  TOKEN_INVALID: "Invalid token",

  CATEGORY_NOT_FOUND: "Category not found",
  CATEGORY_EXISTS: "Category already exists",
  CATEGORY_CREATE_SUCCESS: "Category created successfully",
  CATEGORY_UPDATE_SUCCESS: "Category updated successfully",
  CATEGORY_DELETE_SUCCESS: "Category deleted successfully",

  PRODUCT_NOT_FOUND: "Product not found",
  PRODUCT_EXISTS: "Product already exists",
  PRODUCT_CREATE_SUCCESS: "Product created successfully",
  PRODUCT_UPDATE_SUCCESS: "Product updated successfully",
  PRODUCT_DELETE_SUCCESS: "Product deleted successfully",

  INVALID_PAYLOAD: "Invalid request payload",
  MISSING_FIELDS: "Required fields missing",
  INVALID_ID: "Invalid ID provided",
};

export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

export const SORT_OPTIONS = {
  PRICE_ASC: "price_asc",
  PRICE_DESC: "price_desc",

  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc'
};

export const TOKEN = {
  EXPIRES_IN: "7d",
};
