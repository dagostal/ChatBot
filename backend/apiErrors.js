class ApiError extends Error {
    constructor(errorCode, errorMessage) {
        super(errorMessage);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}

class ResourceDoesNotExistError extends ApiError {
    constructor(message) {
        super(404, message ? message : "Resource does not exist");
    }
}

class UnauthorizedError extends ApiError {
    constructor(message) {
        super(401, message ? message : "Unauthorized");
    }
}

class BadRequestError extends ApiError {
    constructor(message) {
        super(400, message ? message : "Bad Request");
    }
}

class PermissionDeniedError extends ApiError {
    constructor(message) {
        super(403, message ? message : "Permission Denied");
    }
}

module.exports = {
    UnauthorizedError,
    BadRequestError,
    ApiError,
    ResourceDoesNotExistError,
    PermissionDeniedError,
};
