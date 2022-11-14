function BadRequest(message = 'Invalid UserName or Password') {
  const error = new Error(message);
  error.name = 'BadRequest';
  throw error;
}

function Unauthorized(message = 'Empyt or invalid token') {
  const error = new Error(message);
  error.name = 'Unauthorized';
  throw error;
}

function Conflict(message) {
  const error = new Error(message);
  error.name = 'Conflict';
  throw error;
}

function NotFound(message) {
  const error = new Error(message);
  error.name = 'NotFound';
  throw error;
}

function InternalServerError() {
  throw new Error(
    'Sorry for the inconvenience, but the service is unavailable. Please try again later.',
  );
}

module.exports = {
  BadRequest,
  Unauthorized,
  Conflict,
  NotFound,
  InternalServerError,
};