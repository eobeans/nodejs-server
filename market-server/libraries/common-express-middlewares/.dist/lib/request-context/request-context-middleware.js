"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequestId = void 0;
const global_context_1 = require("@practica/global-context");
const node_crypto_1 = require("node:crypto");
/**
 * This is an express middleware that:
 * - Generate/Use request id (depending on if you already have one in the request header)
 * - Add it to the request context
 *
 * **Important:** this should be your first middleware
 */
const REQUEST_ID_HEADER = 'x-request-id';
function addRequestId(req, res, next) {
    let requestId = req.headers[REQUEST_ID_HEADER];
    if (!requestId) {
        requestId = (0, node_crypto_1.randomUUID)();
        req.headers[REQUEST_ID_HEADER] = requestId;
    }
    res.setHeader(REQUEST_ID_HEADER, requestId);
    const currentContext = (0, global_context_1.context)().getStore();
    if (currentContext) {
        // Append to the current context
        currentContext.requestId = requestId;
        next();
        return;
    }
    (0, global_context_1.context)().run({ requestId }, next);
}
exports.addRequestId = addRequestId;
