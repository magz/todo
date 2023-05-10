import { Request, Response } from "express";
import { db_test  } from "./controllers/home";
import { getToDoItems, createToDoItem } from "./controllers/to_do_items";

const express = require('express')
const app = express()

const port = 3000

app.get('/', (req: Request, res: Response) => res.send('Hello World!'))
app.get('/db', db_test)

app.get('/to_do_items', getToDoItems)
app.post('/to_do_items', createToDoItem)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
