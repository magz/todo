"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDo = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('todo', 'magz', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});
exports.ToDo = sequelize.define('todo', {
    name: sequelize_1.DataTypes.STRING,
    description: sequelize_1.DataTypes.STRING,
});
//# sourceMappingURL=to_do.js.map