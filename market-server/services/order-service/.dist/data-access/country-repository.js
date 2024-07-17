"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountries = void 0;
const prisma_client_factory_1 = require("./prisma-client-factory");
async function getAllCountries() {
    const results = (0, prisma_client_factory_1.getPrismaClient)().country.findMany();
    return results;
}
exports.getAllCountries = getAllCountries;
