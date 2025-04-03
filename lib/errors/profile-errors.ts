export class ProfileError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'PROFILE_ERROR'
  ) {
    super(message)
    this.name = 'ProfileError'
  }
}

export class ValidationError extends ProfileError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class UnauthorizedError extends ProfileError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}