"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = require("./controllers/home");
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/db', home_1.db_test);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=app.js.map