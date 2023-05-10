import { NextFunction, Request, Response } from "express";
import { sequelize } from "../db";

import { ToDoItem } from "../models/ToDoItem";

export const getToDoItems = async (req: Request, res: Response) => {
    try {
        const toDoItems = await ToDoItem.findAll();
        res.json(toDoItems);
      } catch (error) {
        console.error('Error retrieving to-do items:', error);
        res.status(500).json({ error: 'Failed to retrieve to-do items' });
    }
}

export const createToDoItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const toDoItem = await ToDoItem.create(req.body)  
    res.json(toDoItem);
  } catch(error) {
    console.error('Error creating to-do item:', error);
    res.status(500).json({ error: 'Failed to create to-do items' });
  }
};
