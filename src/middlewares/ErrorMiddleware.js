const { ZodError } = require('zod');

/** @type {import('express').RequestHandler} */
async function ErrorMiddleware(error, _req, res, _next) {
  const statusCode = {
    ValidationError: 400,
    UnauthorizedError: 401, 
    NotExistError: 404,
    ConflictError: 409,  
  };

  if (error instanceof ZodError) {
    return res.status(statusCode.ValidationError).json({ message: error.issues[0].message });
  }

  if (!statusCode[error.name]) {
    return res.status(500).json({ message: error.message });
  }

  res.status(statusCode[error.name]).json({ message: error.message });
}

module.exports = ErrorMiddleware;