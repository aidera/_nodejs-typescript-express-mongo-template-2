import config from "config";
import jwt from "jsonwebtoken";

import errorHandler from "../services/error-handler";
import responseCodes from "../utils/response-codes";

/* Use "Authorization" header with value: "Bearer <token>" */

export default (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    errorHandler.throw({ statusCode: 401 });
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, config.get("jwtSecret"));
  } catch (err) {
    errorHandler.throw({ statusCode: 401, errorCode: responseCodes.invalidToken });
  }

  if (!decodedToken) {
    errorHandler.throw({ statusCode: 401 });
  }

  req.authUserId = decodedToken.userId;
  next();
};
