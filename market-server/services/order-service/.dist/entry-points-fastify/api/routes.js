"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const typebox_1 = require("@sinclair/typebox");
const logger_1 = require("@practica/logger");
const node_util_1 = __importDefault(require("node:util"));
const order_schema_1 = require("../../domain/order-schema");
const newOrderUseCase = __importStar(require("../../domain/new-order-use-case"));
async function routes(app) {
    app.post('/', {
        schema: {
            body: order_schema_1.orderSchema,
            response: {
                202: {
                    description: 'Successful acceptance of logs, but not necessarily processing',
                    type: 'null',
                },
                ...commonHTTPResponses,
            },
        },
        handler: async (request) => {
            logger_1.logger.info(`Order API was called to add new Order ${node_util_1.default.inspect(request.body)}`);
            // ✅ Best Practice: Using the 3-tier architecture, routes/controller are kept thin, logic is encapsulated in a dedicated domain folder
            const addOrderResponse = await newOrderUseCase.addOrder(request.body);
            return addOrderResponse;
        },
    });
    app.get('/:id', {
        schema: {
            response: {
                200: order_schema_1.orderSchema,
                ...commonHTTPResponses,
            },
            params: typebox_1.Type.Object({
                id: typebox_1.Type.Number(),
            }),
        },
        handler: async (request, response) => {
            // Validation runs before the handler, request.params.id must be a number
            logger_1.logger.info(`Order API was called to get order by id`, {
                orderId: request.params.id,
            });
            const result = await newOrderUseCase.getOrder(request.params.id);
            if (!result) {
                response.status(404);
                return;
            }
            response.send(result);
        },
    });
    app.delete('/:id', {
        schema: {
            response: {
                204: order_schema_1.orderSchema,
                ...commonHTTPResponses,
            },
            params: typebox_1.Type.Object({
                id: typebox_1.Type.Number(),
            }),
        },
        handler: async (request, response) => {
            logger_1.logger.info(`Order API was called to delete order`, {
                orderId: request.params.id,
            });
            await newOrderUseCase.deleteOrder(request.params.id);
            response.status(204).send();
        },
    });
}
exports.routes = routes;
const commonHTTPResponses = {
    401: {
        description: 'Unauthorized request, please provide a valid API key',
        type: 'null',
    },
    400: {
        description: 'Bad request, please check your request body',
        type: 'null',
    },
    500: {
        description: 'Internal server error, please try again later',
        type: 'null',
    },
};
