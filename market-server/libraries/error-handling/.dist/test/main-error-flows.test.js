"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@practica/logger");
const app_error_1 = require("../app-error");
const error_handler_1 = require("../error-handler");
beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(process, 'exit').mockImplementation();
});
describe('Error handler', () => {
    describe('Listen to error events', () => {
        test('When uncaughtException emitted, error handled should catch and handle the error properly', () => {
            const loggerStub = jest.spyOn(logger_1.logger, 'error').mockImplementation();
            error_handler_1.errorHandler.listenToErrorEvents({
                close: jest.fn(),
            });
            const errorName = 'mocking an uncaught exception';
            const errorToEmit = new Error(errorName);
            process.emit('uncaughtException', errorToEmit);
            expect(loggerStub).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
                name: errorToEmit.name,
                message: errorToEmit.message,
                stack: expect.any(String),
                HTTPStatus: 500,
                isCatastrophic: true,
            }));
        });
    });
    describe('Handle error', () => {
        test('When passing standard AppError object, then all the important properties are passed to the logger', () => {
            const errorToHandle = new app_error_1.AppError('invalid-input', 'missing important field', 400, true);
            const loggerListener = jest
                .spyOn(logger_1.logger, 'error')
                .mockImplementation(() => { });
            error_handler_1.errorHandler.handleError(errorToHandle);
            expect(loggerListener).toHaveBeenCalledWith('missing important field', expect.objectContaining({
                name: 'invalid-input',
                HTTPStatus: 400,
                message: 'missing important field',
                isCatastrophic: true,
                stack: expect.any(String),
            }));
        });
        test('When receiving extra custom properties, then standard properties and extra properties are logged', () => {
            const errorToHandle = { status: 409, customProperty: 'customValue' };
            const loggerListener = jest
                .spyOn(logger_1.logger, 'error')
                .mockImplementation(() => { });
            error_handler_1.errorHandler.handleError(errorToHandle);
            expect(loggerListener).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
                name: expect.any(String),
                HTTPStatus: 409,
                message: expect.any(String),
                customProperty: 'customValue',
                isCatastrophic: true,
            }));
        });
        test.each([
            1,
            'oops, this error is actually a string!',
            null,
            Infinity,
            false,
            { someKey: 'someValue' },
            [],
            undefined,
            NaN,
            '🐥',
            () => undefined,
        ])('When receiving non standard Error input, then calling the logger with all the mandatory properties', (unknownErrorValue) => {
            const loggerStub = jest.spyOn(logger_1.logger, 'error');
            error_handler_1.errorHandler.handleError(unknownErrorValue);
            expect(loggerStub).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
                name: 'unknown-error',
                HTTPStatus: 500,
                isCatastrophic: true,
            }));
        });
    });
});
//# sourceMappingURL=main-error-flows.test.js.map