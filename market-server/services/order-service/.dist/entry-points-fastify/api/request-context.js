"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestContextPlugin = void 0;
const request_context_1 = require("@fastify/request-context");
const node_crypto_1 = require("node:crypto");
async function requestContextPlugin(app) {
    app.register(request_context_1.fastifyRequestContext, {
        defaultStoreValues: { requestId: '' },
    });
    app.addHook('preValidation', async () => {
        app.requestContext.set('requestId', (0, node_crypto_1.randomUUID)());
    });
}
exports.requestContextPlugin = requestContextPlugin;
