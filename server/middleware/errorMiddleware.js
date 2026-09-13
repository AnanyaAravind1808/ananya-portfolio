/**
 * Handles requests to unknown routes.
 */
export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.method} ${req.originalUrl}`));
}

/**
 * Centralized error handler. Never leaks stack traces to the client.
 * Recognizes common Mongoose error types and returns clean, specific
 * messages and status codes for them.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Internal server error';

  // Invalid MongoDB ObjectId (CastError)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID format: ${err.value}`;
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    message = 'A record with this value already exists.';
  }

  console.error(`[error] ${req.method} ${req.originalUrl} -> ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    // Stack traces are only included in non-production environments,
    // and are never exposed by default.
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}
