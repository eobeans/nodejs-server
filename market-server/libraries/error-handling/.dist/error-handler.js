"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.covertUnknownToAppError = exports.errorHandler = void 0;
const logger_1 = require("@practica/logger");
const app_error_1 = require("./app-error");
let httpServerRef;
exports.errorHandler = {
    listenToErrorEvents: (httpServer) => {
        httpServerRef = httpServer;
        process.on('uncaughtException', async (error) => {
            await exports.errorHandler.handleError(error);
        });
        process.on('unhandledRejection', async (reason) => {
            await exports.errorHandler.handleError(reason);
        });
        process.on('SIGTERM', async () => {
            logger_1.logger.error('App received SIGTERM event, try to gracefully close the server');
            await terminateHttpServerAndExit();
        });
        process.on('SIGINT', async () => {
            logger_1.logger.error('App received SIGINT event, try to gracefully close the server');
            await terminateHttpServerAndExit();
        });
    },
    handleError: (errorToHandle) => {
        try {
            logger_1.logger.info('Handling error1');
            const appError = covertUnknownToAppError(errorToHandle);
            logger_1.logger.error(appError.message, appError);
            metricsExporter.fireMetric('error', { errorName: appError.name });
            if (appError.isCatastrophic) {
                terminateHttpServerAndExit();
            }
            return appError.HTTPStatus;
        }
        catch (handlingError) {
            process.stdout.write('The error handler failed, here are the handler failure and then the origin error that it tried to handle');
            process.stdout.write(JSON.stringify(handlingError));
            process.stdout.write(JSON.stringify(errorToHandle));
            return 500;
        }
    },
};
const terminateHttpServerAndExit = async () => {
    if (httpServerRef) {
        await httpServerRef.close();
    }
    process.exit();
};
function covertUnknownToAppError(errorToHandle) {
    if (errorToHandle instanceof app_error_1.AppError) {
        return errorToHandle;
    }
    const errorToEnrich = getObjectIfNotAlreadyObject(errorToHandle);
    const message = getOneOfTheseProperties(errorToEnrich, ['message', 'reason', 'description'], 'Unknown error');
    const name = getOneOfTheseProperties(errorToEnrich, ['name', 'code'], 'unknown-error');
    const httpStatus = getOneOfTheseProperties(errorToEnrich, ['HTTPStatus', 'statusCode', 'status'], 500);
    const isCatastrophic = getOneOfTheseProperties(errorToEnrich, ['isCatastrophic', 'catastrophic'], true);
    const stackTrace = getOneOfTheseProperties(errorToEnrich, ['stack'], undefined);
    const standardError = new app_error_1.AppError(name, message, httpStatus, isCatastrophic);
    standardError.stack = stackTrace;
    const standardErrorWithOriginProperties = Object.assign(standardError, errorToEnrich);
    return standardErrorWithOriginProperties;
}
exports.covertUnknownToAppError = covertUnknownToAppError;
const getOneOfTheseProperties = (object, possibleExistingProperties, defaultValue) => {
    for (const property of possibleExistingProperties) {
        if (property in object) {
            return object[property];
        }
    }
    return defaultValue;
};
const metricsExporter = {
    fireMetric: async (name, labels) => {
        logger_1.logger.info(`Firing metric ${name} with labels ${JSON.stringify(labels)}`);
    },
};
function getObjectIfNotAlreadyObject(target) {
    if (typeof target === 'object' && target !== null) {
        return target;
    }
    return {};
}
//# sourceMappingURL=error-handler.js.map