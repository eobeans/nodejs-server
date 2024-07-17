"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupData = exports.deleteOrder = exports.getOrderById = exports.addOrder = void 0;
const prisma_client_factory_1 = require("./prisma-client-factory");
// ️️️✅ Best Practice: The repository pattern - Wrap the entire DB layer with a simple interface that returns plain JS objects
async function addOrder(newOrderRequest) {
    const resultOrder = await (0, prisma_client_factory_1.getPrismaClient)().order.create({
        data: { ...newOrderRequest },
    });
    return resultOrder;
}
exports.addOrder = addOrder;
async function getOrderById(id) {
    const resultOrder = await (0, prisma_client_factory_1.getPrismaClient)().order.findUnique({
        where: {
            id,
        },
        include: { country: true },
    });
    return resultOrder;
}
exports.getOrderById = getOrderById;
async function deleteOrder(orderIdToDelete) {
    const deleteResult = await (0, prisma_client_factory_1.getPrismaClient)().order.delete({
        where: {
            id: orderIdToDelete,
        },
    });
    return deleteResult;
}
exports.deleteOrder = deleteOrder;
async function cleanupData() {
    const deleteResult = await (0, prisma_client_factory_1.getPrismaClient)().order.deleteMany();
    return deleteResult;
}
exports.cleanupData = cleanupData;
