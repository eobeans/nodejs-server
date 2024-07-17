"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastifyErrorMiddleware = void 0;
const error_handler_1 = require("./error-handler");
function fastifyErrorMiddleware(error, _request, reply) {
    const standardAppError = (0, error_handler_1.covertUnknownToAppError)(error);
    standardAppError.isCatastrophic = false;
    const responseToRequest = error_handler_1.errorHandler.handleError(standardAppError);
    reply.status(responseToRequest).send({});
}
exports.fastifyErrorMiddleware = fastifyErrorMiddleware;
//# sourceMappingURL=fastify-error-middleware.js.map