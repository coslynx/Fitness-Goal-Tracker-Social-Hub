// Define a TypeScript enum for custom error codes used across the application.
// These codes are used for both frontend and backend error handling,
// providing a consistent and informative approach to error management.
// Ensure that each error code is unique and descriptive, aiding in debugging.
enum ErrorCodes {
  // Authentication Errors
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
  // User Management Errors
  USER_UPDATE_FAILED = 'USER_UPDATE_FAILED',
  // Goal Management Errors
  GOAL_CREATION_FAILED = 'GOAL_CREATION_FAILED',
  GOAL_UPDATE_FAILED = 'GOAL_UPDATE_FAILED',
  GOAL_NOT_FOUND = 'GOAL_NOT_FOUND',
  // Post Management Errors
  POST_CREATION_FAILED = 'POST_CREATION_FAILED',
  POST_UPDATE_FAILED = 'POST_UPDATE_FAILED',
  POST_NOT_FOUND = 'POST_NOT_FOUND',
  // General Errors
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
  // Database Errors
  DATABASE_ERROR = 'DATABASE_ERROR',
}

// Export the ErrorCodes enum to be accessible across the application.
// This allows other parts of the codebase to use these error codes
// consistently for error handling and displaying user-friendly error messages.
export const errorCodes = ErrorCodes;