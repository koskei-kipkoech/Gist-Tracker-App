export class GistError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'GIST_ERROR'
  ) {
    super(message)
    this.name = 'GistError'
  }
}

export class ValidationError extends GistError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class UnauthorizedError extends GistError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

export class NotFoundError extends GistError {
  constructor(message: string = 'Gist not found') {
    super(message, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}