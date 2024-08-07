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
const axios_1 = __importDefault(require("axios"));
const nock_1 = __importDefault(require("nock"));
const sinon_1 = __importDefault(require("sinon"));
const server_1 = require("../entry-points/api/server");
const testHelpers = __importStar(require("./test-helpers"));
// Configuring file-level HTTP client with base URL will allow
// all the tests to approach with a shortened syntax
let axiosAPIClient;
beforeAll(async () => {
    process.env.JWT_TOKEN_SECRET = testHelpers.exampleSecret;
    // ️️️✅ Best Practice: Place the backend under test within the same process
    const apiConnection = await (0, server_1.startWebServer)();
    const axiosConfig = {
        baseURL: `http://127.0.0.1:${apiConnection.port}`,
        validateStatus: () => true,
        headers: {
            // ️️️✅ Best Practice: Test like production, include real token to stretch the real authentication mechanism
            authorization: testHelpers.signValidTokenWithDefaultUser(),
        },
    };
    axiosAPIClient = axios_1.default.create(axiosConfig);
    // ️️️✅ Best Practice: Ensure that this component is isolated by preventing unknown calls
    nock_1.default.disableNetConnect();
    nock_1.default.enableNetConnect('127.0.0.1');
});
beforeEach(() => {
    // ️️️✅ Best Practice: Start each test with a clean slate
    nock_1.default.cleanAll();
    sinon_1.default.restore();
    (0, nock_1.default)('http://localhost/user/').get(`/1`).reply(200, {
        id: 1,
        name: 'John',
        terms: 45,
    });
});
afterAll(async () => {
    nock_1.default.enableNetConnect();
    (0, server_1.stopWebServer)();
});
// ️️️✅ Best Practice: Structure tests by routes and stories
describe('/api', () => {
    describe('GET /order', () => {
        test.only('When asked for an existing order, Then should retrieve it and receive 200 response', async () => {
            // Arrange
            const orderToAdd = {
                userId: 1,
                productId: 2,
                countryId: 1,
                deliveryAddress: '123 Main St, New York, NY 10001',
                paymentTermsInDays: 30,
            };
            const { data: { id: addedOrderId }, } = await axiosAPIClient.post(`/order`, orderToAdd);
            // Act
            // ️️️✅ Best Practice: Use generic and reputable HTTP client like Axios or Fetch. Avoid libraries that are coupled to
            // the web framework or include custom assertion syntax (e.g. Supertest)
            const getResponse = await axiosAPIClient.get(`/order/${addedOrderId}`);
            // Assert
            expect(getResponse).toMatchObject({
                status: 200,
                data: {
                    ...orderToAdd,
                },
            });
        });
        test('When asked for an non-existing order, Then should receive 404 response', async () => {
            // Arrange
            const nonExistingOrderId = -1;
            // Act
            const getResponse = await axiosAPIClient.get(`/order/${nonExistingOrderId}`);
            // Assert
            expect(getResponse.status).toBe(404);
        });
    });
});
