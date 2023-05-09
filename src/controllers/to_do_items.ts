import { Request, Response } from "express";
import { sequelize } from "../db";

import { ToDoItem } from "../models/ToDoItem";

export const indexToDoItems = async (req: Request, res: Response) => {
    try {
        const toDoItems = await ToDoItem.findAll();
        res.json(toDoItems);
      } catch (error) {
        console.error('Error retrieving to-do items:', error);
        res.status(500).json({ error: 'Failed to retrieve to-do items' });
    }
}