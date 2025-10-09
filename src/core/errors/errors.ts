import { AppError } from './appError';

class NotFoundError extends AppError {
  constructor(message: string = 'Not found') {
    super(message, 404);
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

class BadRequestError extends AppError {
  constructor(message: string = 'Bad request') {
    super(message, 400);
  }
}

class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 400);
  }
}

class UnknownError extends AppError {
  constructor(message: string = 'Unexpected server error') {
    super(message, 401);
  }
}

export const AppErrors = {
  NotFound: NotFoundError,
  Unathorized: UnauthorizedError,
  BadRequest: BadRequestError,
  ValidationFailed: ValidationError,
  Unknown: UnknownError,
} as const;
