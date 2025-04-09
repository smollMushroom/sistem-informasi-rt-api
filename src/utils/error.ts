class NotFoundError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 404; 
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

class ValidationError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 400;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

class ConflictError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 409;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

class UnauthorizedError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 401;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

class ForbiddenError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 403;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export {NotFoundError, ValidationError, ConflictError, UnauthorizedError, ForbiddenError};