import { Request, Response } from "express";
import { db_test  } from "./controllers/home";
import { getToDoItems, createToDoItem } from "./controllers/to_do_items";
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';


const app = express()

const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '..', 'client', 'src')))

app.get('/', (req: Request, res: Response) => res.send('Hello World!'))
app.get('/db', db_test)

app.get('/to_do_items', getToDoItems)
app.post('/to_do_items', createToDoItem)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
