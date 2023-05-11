"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const up = function (queryInterface, sequelize) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.bulkInsert('ToDoItems', [{
                name: 'first todo',
                description: 'here is a todo item',
                createdAt: new Date(),
                updatedAt: new Date(),
            }], {});
    });
};
exports.up = up;
const down = function (queryInterface, sequelize) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('People', null, {});
    });
};
exports.down = down;
//# sourceMappingURL=20230509193940-demo-to-do-items.js.map