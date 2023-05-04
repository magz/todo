import { Request, Response } from "express";

/**
 * Home page.
 * @route GET /home
 */
export const home = (req: Request, res: Response) => {
    res.render("home", {
        title: "home"
    })
}