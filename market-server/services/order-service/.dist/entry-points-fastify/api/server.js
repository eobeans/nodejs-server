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
exports.stopWebServer = exports.startWebServer = void 0;
const configurationProvider = __importStar(require("@practica/configuration-provider"));
const cors_1 = __importDefault(require("@fastify/cors"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const fastify_1 = __importDefault(require("fastify"));
const error_handling_1 = require("@practica/error-handling");
const common_fastify_plugins_1 = require("@practica/common-fastify-plugins");
const logger_1 = require("@practica/logger");
const open_api_options_1 = require("./open-api-options");
const config_1 = __importDefault(require("../../config"));
const routes_1 = require("./routes");
const request_context_1 = require("./request-context");
let httpServer;
// ️️️✅ Best Practice: API exposes a start/stop function to allow testing control WHEN this should happen
async function startWebServer() {
    logger_1.logger.info(`Starting the web server now`);
    configurationProvider.initializeAndValidate(config_1.default);
    const app = (0, fastify_1.default)({
        logger: true,
    });
    app.setErrorHandler(error_handling_1.fastifyErrorMiddleware);
    await generateOpenAPI(app);
    registerCommonPlugins(app);
    registerAllRoutes(app);
    const connectionAddress = await listenToRequests(app);
    httpServer = app.server;
    return connectionAddress;
}
exports.startWebServer = startWebServer;
async function stopWebServer() {
    if (httpServer) {
        await httpServer.close();
        httpServer = undefined;
    }
}
exports.stopWebServer = stopWebServer;
async function generateOpenAPI(app) {
    app.register(swagger_1.default, open_api_options_1.OpenAPIOptions);
    app.register(swagger_ui_1.default, open_api_options_1.OpenAPIUIOptions);
}
async function registerAllRoutes(app) {
    app.register(routes_1.routes, { prefix: '/order' });
}
async function listenToRequests(app) {
    return new Promise((resolve, reject) => {
        const portToListenTo = configurationProvider.getValue('port');
        const webServerPort = portToListenTo
            ? parseInt(portToListenTo, 10)
            : undefined;
        app.listen({ host: '0.0.0.0', port: webServerPort }, (err) => {
            if (err) {
                reject(err);
                // eslint-disable-next-line
                process.exit(1);
            }
            resolve(app.server.address());
        });
    });
}
async function registerCommonPlugins(app) {
    app.register(common_fastify_plugins_1.RequestContext);
    app.register(common_fastify_plugins_1.JWTVerifier, {
        secret: configurationProvider.getValue('jwtTokenSecret'),
    });
    app.register(request_context_1.requestContextPlugin);
    app.register(cors_1.default, {
        origin: '*',
        methods: ['POST'],
    });
}
