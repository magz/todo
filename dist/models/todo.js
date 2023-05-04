"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('sqlite::memory:');
const Todo = sequelize.define('Todo', {
    name: sequelize_1.DataTypes.STRING,
    description: sequelize_1.DataTypes.STRING,
});
//# sourceMappingURL=todo.js.map