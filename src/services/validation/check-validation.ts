import {validationResult} from "express-validator";

import errorHandler from "../error-handler";
import responseCodes from "../../utils/response-codes";

export default (req) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    errorHandler.throw({
      statusCode: 422,
      errorCode: responseCodes.validationFailed,
      validationErrors
    });
  }
};
