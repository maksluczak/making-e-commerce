import {Request, Response} from "express";

export const updatePopularity = async (req: Request, res: Response) => {
    try {
        const itemId = req.params.id;
        const { popularity } = req.body;

    } catch (err) {
        return res.status(400).json({error: err});
    }
}