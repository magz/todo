import express from 'express';
import bodyParser from "body-parser";
// import compression from "compression";  // compresses requests
import path from "path";
// import lusca from "lusca";

import * as homeController from "./controllers/home"
import * as toDoController from "./controllers/to_do"

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(lusca.xframe("SAMEORIGIN"));
// app.use(lusca.xssProtection(true));

// app.use(compression());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.get('/', homeController.home);
app.get('/db', homeController.db_test);
app.get('/db_list', homeController.db_list_tables);

app.get('/todos', toDoController.index)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
