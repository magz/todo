"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = require("./controllers/home");
const to_do_items_1 = require("./controllers/to_do_items");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 5000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'client', 'src')));
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/db', home_1.db_test);
app.get('/to_do_items', to_do_items_1.getToDoItems);
app.post('/to_do_items', to_do_items_1.createToDoItem);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '..', '..', 'client', 'public', 'index.html'));
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=app.js.map