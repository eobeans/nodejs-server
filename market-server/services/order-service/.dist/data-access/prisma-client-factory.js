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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClient = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/no-extraneous-dependencies
const client_1 = require(".prisma/client");
const configurationProvider = __importStar(require("@practica/configuration-provider"));
let prismaClientInstance;
function getPrismaClient() {
    if (!prismaClientInstance) {
        const connectionString = `postgresql://${configurationProvider.getValue('DB.userName')}:${configurationProvider.getValue('DB.password')}@${configurationProvider.getValue('DB.url')}:${configurationProvider.getValue('DB.port')}/shop?schema=public`;
        prismaClientInstance = new client_1.PrismaClient({
            datasources: {
                db: {
                    url: connectionString,
                },
            },
        });
    }
    return prismaClientInstance;
}
exports.getPrismaClient = getPrismaClient;
