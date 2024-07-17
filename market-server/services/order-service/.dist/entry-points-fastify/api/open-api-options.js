"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAPIUIOptions = exports.OpenAPIOptions = void 0;
exports.OpenAPIOptions = {
    openapi: {
        info: {
            title: 'Order service',
            description: 'The order service API ',
            version: '0.8.0',
        },
        tags: [{ name: 'v0.8', description: 'Current version in production' }],
    },
};
exports.OpenAPIUIOptions = {
    routePrefix: '/docs',
    exposeRoute: true,
};
