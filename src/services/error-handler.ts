import responseCodes from "../utils/response-codes";

export interface ErrParams {
  statusCode?: number;
  errorCode?: string;
  description?: string;
  validationErrors?: any;
}

export interface ErrnoException extends Error {
  statusCode?: number;
  errorCode?: string;
  description?: string;
  validationErrors?: any;
}


export default {
  throw: ({statusCode, errorCode, description, validationErrors}: ErrParams) => {
    const error: ErrnoException = new Error();
    error.statusCode = statusCode;
    error.errorCode = errorCode;
    error.description = description;
    error.validationErrors = validationErrors;
    throw error;
  },

  set: (app) => {
    app.use((error, req, res, next) => {
      const statusCode = error.statusCode || 500;
      const errorCode = error.errorCode;
      const description = error.description;
      const validationErrors = error.validationErrors;

      switch (statusCode) {
        case 401:
          res.status(statusCode).json({error: {code: errorCode || responseCodes.unauthenticated, description: description || 'You are not authorized'}});
          break;
        case 400:
        case 404:
          res.status(statusCode).json({error: {code: errorCode || responseCodes.notFound, description}});
          break;
        case 422:
          res.status(statusCode).json({error: {code: errorCode || responseCodes.validationFailed, description, ...validationErrors}});
          break;
        default:
          res.status(statusCode).json({error: {code: errorCode || responseCodes.serverError, description}});
      }
    });
  }
}

