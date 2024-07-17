"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderModel = void 0;
const sequelize_1 = require("sequelize");
const country_model_1 = require("./country-model");
const db_connection_1 = __importDefault(require("./db-connection"));
function getOrderModel() {
    const orderModel = (0, db_connection_1.default)().define('Order', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        deliveryAddress: {
            type: sequelize_1.DataTypes.STRING,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        countryId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        paymentTermsInDays: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        productId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
    }, { freezeTableName: true });
    orderModel.belongsTo((0, country_model_1.getCountryModel)(), {
        foreignKey: {
            name: 'countryId',
        },
    });
    return orderModel;
}
exports.getOrderModel = getOrderModel;
