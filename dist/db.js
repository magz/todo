"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize("magz", process.env.PGUSER, "foobarbaz", {
    host: process.env.PGHOST,
    port: 5432,
    dialect: 'postgres',
});
//# sourceMappingURL=db.js.map