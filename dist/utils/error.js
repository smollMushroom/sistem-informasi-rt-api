"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.UnauthorizedError = exports.ConflictError = exports.ValidationError = exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.status = 409;
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
exports.ConflictError = ConflictError;
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
exports.ForbiddenError = ForbiddenError;
