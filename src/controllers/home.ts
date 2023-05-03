import { Request, Response } from "express";

/**
 * Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
    res.send('Hello Index Page!');};

export const home = (req: Request, res: Response) => {
    res.render("home", {
        title: "home"
    })
}