import morgan from "morgan";

morgan.token("request-body", (request) => JSON.stringify(request.body));

morgan.token("response-body", (_request, response) => response.__body || "");

const format =
  ':method :url :status - Request Body: :request-body - Response Body: :response-body - :response-time ms';

const responseCapture = (_request, response, next) => {
  const oldJson = response.json;

  response.json = function (body) {
    response.__body = JSON.stringify(body);
    return oldJson.call(this, body);
  };

  next();
};

export const requestuestLogger = (app) => {
  if (["development", "staging"].includes(process.env.NODE_ENV)) {
    app.use(responseCapture);
    app.use(morgan(format));
  }
};

