import { Request, Response } from "express";
import { sequelize } from "../db";

import { ToDoItem } from "../models/ToDoItem";

export const indexToDoItems = async (req: Request, res: Response) => {
    const toDoItems = await ToDoItem.findAll();
    res.json(toDoItems);
}