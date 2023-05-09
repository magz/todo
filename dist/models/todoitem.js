"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoItem = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class ToDoItem extends sequelize_1.Model {
}
exports.ToDoItem = ToDoItem;
ToDoItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    description: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: 'to_do_items',
    sequelize: db_1.sequelize
});
//# sourceMappingURL=ToDoItem.js.map