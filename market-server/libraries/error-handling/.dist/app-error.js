"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(name, message, HTTPStatus = 500, isCatastrophic = false, cause) {
        super(message);
        this.name = name;
        this.message = message;
        this.HTTPStatus = HTTPStatus;
        this.isCatastrophic = isCatastrophic;
        this.cause = cause;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=app-error.js.map