const { ZodError } = require('zod');

/** @type {import('express').RequestHandler} */
async function ErrorMiddleware(error, _req, res, _next) {
  const statusCode = {
    BadRequest: 400,
    Unauthorized: 401, 
    NotFound: 404,
    Conflict: 409,  
  };

  if (error instanceof ZodError) {
    return res.status(statusCode.BadRequest).json({ message: error.issues[0].message });
  }

  if (!statusCode[error.name]) {
    return res.status(500).json({ message: error.message });
  }

  res.status(statusCode[error.name]).json({ message: error.message });
}

module.exports = ErrorMiddleware;