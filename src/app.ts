import express from 'express';
import bodyParser from "body-parser";
import compression from "compression";  // compresses requests
import path from "path";

import * as homeController from "./controllers/home"
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(compression());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/home", homeController.home);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
