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
exports.createToDoItem = exports.getToDoItems = void 0;
const ToDoItem_1 = require("../models/ToDoItem");
const getToDoItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toDoItems = yield ToDoItem_1.ToDoItem.findAll();
        res.json(toDoItems);
    }
    catch (error) {
        console.error('Error retrieving to-do items:', error);
        res.status(500).json({ error: 'Failed to retrieve to-do items' });
    }
});
exports.getToDoItems = getToDoItems;
const createToDoItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toDoItem = yield ToDoItem_1.ToDoItem.create(req.body);
        res.json(toDoItem);
    }
    catch (error) {
        console.error('Error creating to-do item:', error);
        res.status(500).json({ error: 'Failed to create to-do items' });
    }
});
exports.createToDoItem = createToDoItem;
//# sourceMappingURL=to_do_items.js.map