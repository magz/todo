import { Request, Response } from "express";
import { ToDo }  from "../models/to_do"

/**
 * User index page.
 * @route GET /todos
 */
export const index = async (req: Request, res: Response) => {
    const todos = await ToDo.findAll();
    res.send(todos);
}