import {Request, Response} from "express";
import prisma from "../../prisma";

export const getAllItems = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const items = await prisma.item.findMany({
            include: { variants: true }
        });
        return res.status(200).json(items);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching Items", error: err });
    }
}