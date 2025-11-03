export function validate(schema) {
  return (request, response, next) => {
    const { error } = schema.validate(request.body);
    if (error) {
      return response.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    next();
  };
}
