import { Request, Response } from "express";
import { sequelize } from "../db";

export const home = (req: Request, res: Response) => {
    res.send("hi there!")
}


export const db_test = async (req: Request, res: Response) => {
    try {
        await sequelize.authenticate();
        res.send("database connection working updated")
      } catch (error) {
        res.send("something went wrong with the database connection" + error)
      }
}
