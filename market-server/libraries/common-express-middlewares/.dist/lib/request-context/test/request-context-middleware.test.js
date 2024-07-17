"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const global_context_1 = require("@practica/global-context");
const index_1 = require("../index");
let currentServer;
const REQUEST_ID_HEADER = 'x-request-id';
async function setupExpressServer(setupRoutes) {
    const app = (0, express_1.default)();
    setupRoutes(app);
    const serverInstance = await new Promise((resolve) => {
        currentServer = app.listen(0, () => resolve(currentServer));
    });
    const { port } = serverInstance.address();
    return axios_1.default.create({
        baseURL: `http://127.0.0.1:${port}`,
        // Don't throw on any HTTP status code, validate those in the tests
        validateStatus: () => true,
    });
}
describe('Request ID express middleware', () => {
    afterEach(async () => {
        // Cleaning up the created server instance
        if (currentServer) {
            await new Promise((resolve, reject) => {
                currentServer.close((error) => (error ? reject(error) : resolve()));
            });
        }
    });
    describe('when the request ID already exists in the request header', () => {
        test('when sending a request to an EXISTING route WITH request ID in the request header it should add it to the response header', async () => {
            // Arrange
            const requestId = '801d9251-5916-4b26-85d9-7a33aaa86c9d';
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestId);
                app.get('/', (req, res) => {
                    res.send({});
                });
            });
            // Act
            const response = await client.get('/', {
                headers: {
                    [REQUEST_ID_HEADER]: requestId,
                },
            });
            // Assert
            expect(response).toMatchObject({
                status: 200,
                data: {},
                headers: {
                    [REQUEST_ID_HEADER]: requestId,
                },
            });
        });
        test('when sending a request to MISSING route WITH request ID in the request header it should add it to the response header', async () => {
            // Arrange
            const requestId = '801d9251-5916-4b26-85d9-7a33aaa86c9d';
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestId);
            });
            // Act
            const response = await client.get('/some-missing-route', {
                headers: {
                    [REQUEST_ID_HEADER]: requestId,
                },
            });
            // Assert
            expect(response).toMatchObject({
                status: 404,
                data: {},
                headers: {
                    [REQUEST_ID_HEADER]: requestId,
                },
            });
        });
        test('the provided request id should be available in the request context', async () => {
            // Arrange
            const requestId = '801d9251-5916-4b26-85d9-7a33aaa86c9d';
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestId);
                app.get('/', (req, res) => {
                    res.send({ ...(0, global_context_1.context)().getStore() });
                });
            });
            // Act
            const response = await client.get('/', {
                headers: {
                    [REQUEST_ID_HEADER]: requestId,
                },
            });
            // Assert
            expect(response).toMatchObject({
                status: 200,
                data: {
                    requestId,
                },
            });
        });
    });
    describe('when the request ID does not exists in the request header', () => {
        test('when sending a request to an EXISTING route WITHOUT request ID in the request header it should generate one and it to the response header', async () => {
            // Arrange
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestId);
                app.get('/', (req, res) => {
                    res.send({});
                });
            });
            // Act
            const response = await client.get('/');
            // Assert
            expect(response).toMatchObject({
                status: 200,
                data: {},
                headers: {
                    [REQUEST_ID_HEADER]: expect.any(String),
                },
            });
        });
        test('when sending a request to MISSING route WITH request ID in the request header it should add it to the response header', async () => {
            // Arrange
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestId);
            });
            // Act
            const response = await client.get('/some-missing-route');
            // Assert
            expect(response).toMatchObject({
                status: 404,
                data: {},
                headers: {
                    [REQUEST_ID_HEADER]: expect.any(String),
                },
            });
        });
        test('the generated request id should be available in the request context', async () => {
            // Arrange
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestId);
                app.get('/', (req, res) => {
                    res.send({ ...(0, global_context_1.context)().getStore() });
                });
            });
            // Act
            const response = await client.get('/');
            // Assert
            expect(response).toMatchObject({
                status: 200,
                data: {
                    requestId: expect.any(String),
                },
            });
        });
        test('the request id in the request context should be the same as the one sent in the response header', async () => {
            // Arrange
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestId);
                app.get('/', (req, res) => {
                    res.send({ ...(0, global_context_1.context)().getStore() });
                });
            });
            // Act
            const response = await client.get('/');
            // Assert
            const responseRequestId = response.headers[REQUEST_ID_HEADER];
            expect(response).toMatchObject({
                status: 200,
                data: {
                    requestId: responseRequestId,
                },
                headers: {
                    [REQUEST_ID_HEADER]: expect.any(String),
                },
            });
        });
    });
    test('when request content already exist it should append to it', async () => {
        // Arrange
        const existingContextData = {
            userId: 1,
        };
        const client = await setupExpressServer((app) => {
            app.use((req, res, next) => {
                (0, global_context_1.context)().run({ ...existingContextData }, () => next());
            });
            app.use(index_1.addRequestId);
            app.get('/', (req, res) => {
                res.send({ ...(0, global_context_1.context)().getStore() });
            });
        });
        // Act
        const response = await client.get('/');
        // Assert
        expect(response).toMatchObject({
            status: 200,
            data: {
                requestId: expect.any(String),
                ...existingContextData,
            },
        });
    });
});
